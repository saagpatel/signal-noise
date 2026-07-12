# Signal & Noise G1 — independent statistics review handoff

## Role and independence

Act as the independent statistics reviewer for the G1 thesis-falsification
gate of *Signal & Noise: Second Edition*. You must have relevant experience in
Bayesian inference, diagnostic testing, survey methodology, statistical
education, or an adjacent quantitative field. State your qualifications and
any conflict of interest. You are not being asked to approve implementation,
visual design, accessibility, or publication.

Do not treat the author’s tests or prose as proof. Recompute representative
examples, inspect the named source material, and distinguish mathematical
correctness from pedagogical usefulness. If a financial-return or forensic
claim is outside your expertise, mark it `specialist required` rather than
approving by analogy.

## Materials

Review this branch from the minimum content baseline below, then record the
actual clean `HEAD` you inspected:

- repository: `/Users/d/Projects/_codex-worktrees/signal-noise-g1`
- branch: `codex/manipulable-library-g1`
- minimum content baseline: `c092914`

Required files:

1. `docs/second-edition/THESIS.md`
2. `docs/second-edition/MODEL-SPEC.md`
3. `docs/second-edition/CLAIM-LEDGER.md`
4. `docs/second-edition/REVIEW-PACKET.md`
5. the chapter configuration and content files named by the ledger

Run `git status --short` and `git rev-parse HEAD` before review. Do not approve
an unidentified or dirty working tree. If `HEAD` does not contain `c092914`,
stop and request a corrected checkout.

## Required checks

For each of the ten items in `REVIEW-PACKET.md`:

1. assign `approve`, `revise`, `remove`, or `specialist required`;
2. cite the exact file and claim being assessed;
3. show or describe the independent calculation or source check;
4. identify whether the issue blocks G2 or can be deferred to the prototype;
5. name any residual limitation that must remain visible to readers.

At minimum, independently verify:

- the PPV reference example and the false-positive-rate versus
  false-discovery-rate distinction;
- the equal-variance normal detector assumptions;
- the boundary between independent sampling variation and shared polling
  error;
- the conditional factorization needed to multiply likelihood ratios;
- whether the witness-weight interpolation is acceptable as a sensitivity
  display or must be removed;
- the interpretation and limitations of the normal-return tail probability;
- whether the seven mechanisms support the assumption-audit climax without
  implying one shared equation or quantity; and
- whether all six prewritten transfer cases test the stated objectives.

## Required response

Return one review record in this exact structure:

```text
Reviewer:
Qualifications:
Conflict disclosure:
Review commit SHA:
Date:
Scope:

Item 1 disposition:
Evidence:
Required change:
Gate impact:

[Repeat through Item 10]

Overall verdict: APPROVE G1 | REVISE AND RE-REVIEW | REJECT CURRENT THESIS
Required changes:
Specialist referrals:
Residual limitations:
Signature or durable identity:
```

An overall approval is invalid if any item marked `revise` lacks a completed
and rechecked disposition, if the commit is unidentified, or if reviewer
identity and qualifications are absent. Returning this record does not itself
merge, deploy, or authorize publication; Codex will verify the reviewed commit
and record the gate decision.
