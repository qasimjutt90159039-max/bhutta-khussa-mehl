const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=============================================');
console.log('  Bhutta Khussa Mehal: Starting Hostinger Build');
console.log('=============================================');

const clientDir = path.join(__dirname, 'client');
const clientBuildDir = path.join(clientDir, 'build');
const rootBuildDir = path.join(__dirname, 'build');

function copyFolderSync(from, to) {
  if (fs.cpSync) {
    fs.cpSync(from, to, { recursive: true });
  } else {
    fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach((element) => {
      const srcPath = path.join(from, element);
      const destPath = path.join(to, element);
      const stat = fs.lstatSync(srcPath);
      if (stat.isFile()) {
        fs.copyFileSync(srcPath, destPath);
      } else if (stat.isDirectory()) {
        copyFolderSync(srcPath, destPath);
      }
    });
  }
}

try {
  // 1. Install client dependencies
  console.log('Step 1: Installing frontend dependencies in client/...');
  execSync('npm install --legacy-peer-deps', { cwd: clientDir, stdio: 'inherit' });

  // 2. Build React client bundle
  console.log('\nStep 2: Building React production bundle with CI=false...');
  execSync('npm run build', {
    cwd: clientDir,
    stdio: 'inherit',
    env: { ...process.env, CI: 'false' },
  });

  // 3. Copy client/build to ./build for Hostinger deployment
  console.log('\nStep 3: Copying build output from client/build to ./build...');
  if (fs.existsSync(rootBuildDir)) {
    fs.rmSync(rootBuildDir, { recursive: true, force: true });
  }
  copyFolderSync(clientBuildDir, rootBuildDir);

  console.log('\n=============================================');
  console.log('  Build Completed Successfully! Ready to deploy.');
  console.log('=============================================');
} catch (error) {
  console.error('\nBuild failed with error:', error.message);
  process.exit(1);
}
