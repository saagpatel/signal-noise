# Mathematical and Model Specification

## Test

For prevalence `p`, sensitivity `s=P(+|D)`, and specificity
`c=P(-|not D)`:

```text
PPV = sp / (sp + (1-c)(1-p))
false-positive rate = 1-c
false-discovery rate = 1-PPV
```

Reference: `p=.01`, `s=.95`, `c=.95` gives `PPV≈.161` and
`false-discovery rate≈.839`.

## Signal

The chapter uses equal-variance normal score distributions. False-alarm and
detection probabilities are upper-tail areas at the selected threshold. This
is an illustration, not a universal detector model.

## Forecast

The current model converts a nominal 95% margin to `sigma=MoE/1.96`, uses
`sigma/sqrt(N)` for an assumed independent component, and adds a scenario
shift. The shift is not estimated. Real polls differ in frame, mode, weighting,
timing, design effect, and nonresponse.

## Update

Under a specified binary-hypothesis model:

```text
posterior odds = prior odds × likelihood ratio
```

Multiplying ratios for repeated observations requires the relevant conditional
factorization. Independence is assumed, not inferred by a control.

## Market

The chapter divides one daily percentage move by
`annualVolatility/sqrt(252)` and computes a two-tailed standard-normal tail
probability. The output assumes zero mean, normality, constant volatility, and
the annualization convention. It is not probability of a cause and is not
investment advice. Heavy tails or volatility clustering can change frequency.

## Evidence

The current illustration applies:

```text
LR_effective = LR1 × LR1^w, 0 <= w <= 1
```

`w` interpolates between a redundant boundary and a fully weighted second LR.
It is not an estimated correlation or validated forensic model. G2 must compare
this with an explicit shared-source generative example.

## Final comparison

The sweep maps one display coordinate onto unrelated ranges. No units,
probability, equation, or causal meaning are shared by that coordinate.
