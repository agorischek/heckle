const axios = require("axios");

const { cosmiconfig } = require("cosmiconfig");

async function loadConfig() {
  const searchPlaces = [`checks.config.js`, `$checks.config.cjs`];
  const explorer = cosmiconfig("checks", { searchPlaces });
  const result = await explorer.search();
  return result;
}

async function performChecks(checks, checkId) {
  const results = {};

  if (checkId) {
    const result = await checks[checkId]();
    results[checkId] = result;
  } else {
    const checkIds = Object.keys(checks);

    for await (const checkId of checkIds) {
      const result = await checks[checkId]();
      results[checkId] = result;
    }
  }

  return results;
}

function summarizeErrors(results) {
  const errors = [];
  Object.values(results).forEach((result) => {
    if (result.error && errors.indexOf(result.error) < 0) {
      errors.push(result.error);
    }
  });
  return errors;
}

function summarizeResults(results) {
  const successes = ["The service responds"];
  const errors = [];
  Object.values(results).forEach((result) => {
    if (result.error && errors.indexOf(result.error) < 0) {
      errors.push(result.error);
    } else if (successes.indexOf(result.description)) {
      successes.push(result.description);
    }
  });
  return [successes, errors];
}

async function run(operation, target) {
  const result = target
    ? await runRemote(operation, target)
    : await runLocal(operation);
  return result;
}

async function runRemote(operation, target) {
  let result;
  try {
    const response = await axios.get(target);
    result = response.data;
  } catch (e) {
    // console.log(e);
    result = e.response?.data;
  }
  return result;
}

async function runLocal(operation) {
  const operationSegments = operation ? operation?.split("/") : [];

  const { config, filepath } = await loadConfig();
  const { checks, root } = config;

  const action =
    operationSegments?.[0] === "ping"
      ? "ping"
      : operationSegments?.[0] === checks && operationSegments?.[1]
      ? "singleCheck"
      : "allChecks";

  const ping = {
    healthy: true,
    description: "The service responds",
  };

  const checkId = operationSegments?.[1];

  const results =
    action !== "ping" ? await performChecks(checks, checkId) : undefined;

  const [successes, errors] = results ? summarizeResults(results) : undefined;

  const healthy = errors?.length === 0;

  const status = healthy ? 200 : 500;

  const result = {
    // status: status,
    // body: {
    healthy: healthy,
    // check: check,
    // verified: successes,
    errors: healthy ? undefined : errors,
    ping: action === "ping" ? ping : undefined,
    checks: results,
    // },
  };

  return result;
}

async function call(route, verb, payload) {
  const { config } = await loadConfig();
  const base = config.root ? `${config.root}${route}` : route;
  const url = new URL(base);
  Object.keys(config.params).forEach((param) => {
    if (config.params[param] && !url.searchParams.has(param))
      url.searchParams.set(param, config.params[param]);
  });
  const target = url.toString();
  console.log(target);
  const response = await axios.get(target);
  return response;
}

class HealthError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "HealthError";
    this.code = code;
  }
}

function ensure(reply) {
  return {
    informational: function () {
      if (reply.status !== 100) throw "Not 100";
    },
    successful: function () {
      if (reply.status !== 200) throw "NOT_SUCCESSFUL_RESPONSE";
    },
  };
}

// Informational responses (100–199)
// Successful responses (200–299)
// Redirection messages (300–399)
// Client error responses (400–499)
// Server error responses (500–599)

function verify(condition, err) {
  if (!condition) {
    throw err;
  }
}

function check(description, fn) {
  return async () => {
    try {
      await fn();
      // console.log(`✅ Healthy: ${description}`)
      return {
        healthy: true,
        description: description,
      };
    } catch (error) {
      const errorMessage = typeof error === "string" ? error : error.message;
      // console.log(`⛔️ Unhealthy: ${description} — ${errorMessage}`)
      return {
        healthy: false,
        description: description,
        error: errorMessage,
      };
    }
  };
}

module.exports = {
  call,
  check,
  ensure,
  HealthError,
  loadConfig,
  run,
  verify,
};
