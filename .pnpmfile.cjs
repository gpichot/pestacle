const readPackage = (pkg, context) => {
  if (pkg.peerDependencies && pkg.peerDependencies.react) {
    // fixes react error "Error: Invalid hook call."
    // with multiple copy of react in the node_modules folder
    context.log(
      `[${pkg.name}] Removing react as a peer dependency (https://bit.ly/3jmD8J6).`
    );
    delete pkg.peerDependencies.react;
  }
  // Same for react-dom
  if (pkg.peerDependencies && pkg.peerDependencies["react-dom"]) {
    context.log(
      `[${pkg.name}] Removing react-dom as a peer dependency (https://bit.ly/3jmD8J6).`
    );
    delete pkg.peerDependencies["react-dom"];
  }
  return pkg;
};

module.exports = {
  hooks: {
    readPackage,
  },
};
