const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

exports.handler = async (event, context) => {
  try {
    await app.prepare();
    const { httpMethod, path, queryStringParameters, body } = event;
    
    const parsedUrl = parse(path, true);
    
    const req = {
      method: httpMethod,
      url: path,
      query: queryStringParameters,
      body: body ? JSON.parse(body) : undefined,
    };
    
    const res = {
      statusCode: 200,
      headers: {},
      body: '',
    };
    
    await handle(req, res);
    
    return {
      statusCode: res.statusCode,
      headers: res.headers,
      body: res.body,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}; 