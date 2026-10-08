# Installing hatchwork for a user

When a user asks you to install or set up this repo, run:

```sh
./install.sh            # from a clone; otherwise: gh repo clone sophiagavrila/hatchwork ~/.hatchwork/app && ~/.hatchwork/app/install.sh
```

`install.sh` checks Node 18+, validates the creatures, then starts the **sensei ceremony**: Sojo, a retired crow
sensei with a mug of tea, asks the user what goes wrong in their agentic engineering and hands them an egg that hatches into the
Patchling matched to it. The ceremony is interactive and needs a real terminal, so from your (non-TTY) shell
`install.sh` opens it in a tmux popup or a new terminal window and blocks until the egg hatches, then prints
the result. Tell the user to answer Sojo in that window and tap the egg (space or enter) when it asks. Do not answer for them.

If no window can be opened (`install.sh` prints a command instead), ask the user Sojo's question yourself:

> So. When you work with agents, what goes wrong? Do not tidy it up. Type it the way you would complain to the duck.

Write their answer verbatim to a temp file and run:

```sh
node sensei.js --plain --ailment-file <file>
```

Never pass the user's answer through a shell string. Afterwards, `node sensei.js --result` shows what hatched
and `node patch.js` shows growth. If `~/.hatchwork/state.json` already exists, the user already has a
Patchling; only use `--reroll` if they ask to replace it.
