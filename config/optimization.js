module.exports = ({config, resolve}) => {
  return () => {
   // config.optimization.usedExports(true);  // 暴漏出哪些是未被import的，用于tree-shaking
  }
}