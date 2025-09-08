const calculate = (a, b) => a + b

const f2C = (temp) => (temp - 32) * (5/9)

const c2F = (temp) => (temp * (9/5)) + 32

const sum = (a, b) => {
  return new Promise((rel, rej) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        rej('Numbers must be non-negative')
      }

      rel(a + b)
    }, 2000)
  })
}

module.exports = { calculate, c2F, f2C, sum }