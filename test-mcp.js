import { spawn } from 'child_process';

const server = spawn('node', ['dist/mcp-server/index.js'], { stdio: ['pipe', 'pipe', 'pipe'] });

let output = '';
server.stderr.on('data', (d) => console.log('Server:', d.toString()));

server.stdout.on('data', (d) => {
  output += d.toString();
  console.log('Received:', d.toString());
});

// Send ListTools request
const request = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "tools/list",
  params: {}
}) + '\n';

setTimeout(() => {
  server.stdin.write(request);
}, 500);

setTimeout(() => {
  if(output.includes('playwright_scaffold')) {
    console.log('\n✅ MCP SERVER WORKS! Found tools in response');
  } else {
    console.log('\n❌ No tools found, output was:', output);
  }
  server.kill();
}, 2000);