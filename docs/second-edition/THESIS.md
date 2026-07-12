# Corrected Thesis and Editorial Specification

## Thesis

Different uncertainty problems fail in recurring ways when readers confuse
prevalence, evidence strength, dependence, sampling variation, model error, and
decision thresholds.

The volume does not claim that every chapter is Bayes' theorem or that one
normalized slider has shared mathematical meaning across models.

## Mechanism arc

1. **Prevalence — The Test:** sensitivity and specificity combine with
   prevalence to determine positive predictive value.
2. **Overlap — The Signal:** a threshold trades detections against false alarms
   when signal and noise distributions overlap.
3. **Sampling and shared error — The Forecast:** aggregation can reduce an
   independent error component but cannot identify or remove a shared one.
4. **Sequential evidence — The Update:** prior odds and likelihood ratios
   combine under an explicit evidence model.
5. **Model-relative surprise — The Market:** a standardized observation and
   tail probability are conditional on the chosen return model.
6. **Dependence sensitivity — The Evidence:** repeated evidence cannot be
   multiplied as independent without a supporting joint model.
7. **Assumption check — revised climax:** compare which input and assumption
   drive each model without pretending that parameters are interchangeable.

The final chapter succeeds only if a reader can diagnose why two equally
confident outputs deserve different trust. Synchronized motion alone fails.

## Misconception map

| Mechanism        | Elicit                                           | Correct                                              | Never claim                                        |
| ---------------- | ------------------------------------------------ | ---------------------------------------------------- | -------------------------------------------------- |
| Diagnostic test  | “95% accurate means 95% chance of disease.”      | Use prevalence and a 2×2 count table.                | `1 - PPV` is false-positive rate.                  |
| Detector         | “A stricter threshold only improves accuracy.”   | Show false-alarm/miss tradeoff.                      | Threshold says anything about prevalence.          |
| Polls            | “Fifty polls remove uncertainty.”                | Separate independent and shared error.               | The toy slider explains a historical election.     |
| Updating         | “Strong evidence erases the prior.”              | Compare odds under explicit likelihood assumptions.  | Likelihoods or independence are directly observed. |
| Market           | “Small p proves a cause.”                        | Change the assumed tail model.                       | A p-value is probability of noise or a story.      |
| Witnesses        | “Two matching accounts double evidence.”         | Compare redundant and fully weighted boundaries.     | The exponent estimates dependence.                 |
| Final comparison | “The same percentage means the same confidence.” | Audit units, conditioning, omissions, and decisions. | One equation unifies the chapters.                 |

## Learning objectives

A reader should be able to:

- distinguish prevalence, sensitivity, specificity, false-positive rate,
  positive predictive value, and false-discovery rate;
- explain threshold tradeoffs;
- separate independent sampling variation from shared error;
- state the assumptions needed to multiply likelihood ratios;
- interpret a p-value as conditional on a specified model;
- identify how tail assumptions change surprise;
- audit information lineage rather than count voices; and
- compare confident outputs through units, assumptions, provenance, omissions,
  and decision costs.

These are target outcomes, not claims of demonstrated learning.

## Transfer cases written before final UI

1. **Fraud detector:** use low prevalence to distinguish false-positive rate
   from false-discovery rate.
2. **Airport alarm:** choose between thresholds while naming both false alarms
   and misses plus the relevant costs.
3. **Product surveys:** decide whether twenty surveys using one recruitment
   channel justify `1 / sqrt(N)` shrinkage.
4. **Copied reports:** trace two matching conclusions back to one dataset and
   decide what the second report adds.
5. **Heavy-tailed sensor:** interpret a small normal-model tail probability
   when historical residuals are heavy-tailed.
6. **Three 95s:** distinguish a diagnostic posterior, confidence interval, and
   p-value that all display 95.

Keep decisive values and scoring rubrics out of the teaching surface.
