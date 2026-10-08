# Installing hatchwork for a user

When a user asks you to install or set up this repo, run:

```sh
./install.sh            # from a clone; otherwise: gh repo clone sophiagavrila/hatchwork ~/.hatchwork/app && ~/.hatchwork/app/install.sh
```

`install.sh` checks Node 18+, validates the creatures, then starts the **sensei ceremony**: Sōjōbō, a tengu
sensei, asks the user what ails their agentic engineering and hands them an egg that hatches into the
Patchling matched to it. The ceremony is interactive and needs a real terminal, so from your (non-TTY) shell
`install.sh` opens it in a tmux popup or a new terminal window and blocks until the egg hatches, then prints
the result. Tell the user to answer Sōjōbō in that window. Do not answer for them.

If no window can be opened (`install.sh` prints a command instead), ask the user Sōjōbō's question yourself:

> So tell me what ails your work with agents. Where do you stall? What keeps going wrong?

Write their answer verbatim to a temp file and run:

```sh
node sensei.js --plain --ailment-file <file>
```

Never pass the user's answer through a shell string. Afterwards, `node sensei.js --result` shows what hatched
and `node patch.js` shows growth. If `~/.hatchwork/state.json` already exists, the user already has a
Patchling; only use `--reroll` if they ask to replace it.
