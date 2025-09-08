const { calculate, c2F, f2C, sum } = require('../src/math')

// test('Calculate sum operation', () => {
//   expect(calculate(2, 3)).toBe(5)
// })

// test('Calculate C to F operation', () => {
//   const temp = c2F(0)
//   expect(temp).toBe(32)
// })

// test('Calculate F to C operation', () => {
//   const temp = f2C(32)
//   expect(temp).toBe(0)
// })

// ################ Async tests
// test('Calculate sum async operation with callback', (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2)
//     done()
//   }, 2000)
// })

// test('Calculate sum async operation with promise', (done) => {
//   sum(2, 3).then(r => {
//     expect(r).toBe(5)
//     done()
//   })
// })

test('Calculate sum async operation with async/await', async () => {
  const t = await sum(2, 3)
  expect(t).toBe(5)
})