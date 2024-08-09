const core = require('@actions/core');
const exec = require('@actions/exec');

export async function run() {
    try {
        const apiKey = core.getInput('api_key');
        const appKey = core.getInput('app_key');
        const appPath = core.getInput('app_path');
        const releaseNotes = core.getInput('release_notes');
        
        let commandOutput = '';
        let commandError = '';
        
        const options = {};
        options.listeners = {
          stdout: (data) => {
              commandOutput += data.toString();
          },
          stderr: (data) => {
              commandError += data.toString();
          }
        };
        
        // -f -F whats_new="${releaseNotes}" -F build_type="github-action" -F app=@${appPath} 
        await exec.exec(`curl -X PUT https://getupdraft.com/api/app_upload/${appKey}/${apiKey}/`);
        
        console.log(`output: ${commandOutput}, error: ${commandError}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}