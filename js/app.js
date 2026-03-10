const cards = Array.from(document.querySelectorAll(".command-card"));
const terminalOutput = document.querySelector("#terminal-output");
const terminalInput = document.querySelector("#terminal-input");
const terminalRun = document.querySelector("#terminal-run");
const search = document.querySelector("#search");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const safeText = (text) => text.replace(/[<>]/g, "");

async function typeLine(text, prefix = "") {
  const line = document.createElement("div");
  terminalOutput.appendChild(line);
  for (let i = 0; i < text.length; i += 1) {
    line.textContent = `${prefix}${text.slice(0, i + 1)}`;
    await sleep(12);
  }
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

async function runCommand(command, output) {
  terminalOutput.classList.remove("pulse");
  terminalOutput.classList.add("pulse");
  await typeLine(safeText(command), "$ ");
  const lines = output.split("\\n");
  for (const line of lines) {
    await typeLine(safeText(line));
  }
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

cards.forEach((card) => {
  const button = card.querySelector(".run-btn");
  const copyButton = card.querySelector(".copy-btn");

  if (button) {
    button.addEventListener("click", () => {
      const command = card.dataset.command || "comando";
      const output = card.dataset.output || "Simulacion en progreso";
      runCommand(command, output);
    });
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const text = copyButton.dataset.copy || "";
      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = "Copiado";
      } catch (error) {
        const helper = document.createElement("textarea");
        helper.value = text;
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        helper.remove();
        copyButton.textContent = "Copiado";
      }
      setTimeout(() => {
        copyButton.textContent = "Copiar";
      }, 1000);
    });
  }
});

if (search) {
  search.addEventListener("input", () => {
    const query = search.value.toLowerCase();
    cards.forEach((card) => {
      const text = `${card.dataset.command || ""} ${card.dataset.tags || ""} ${card.textContent}`.toLowerCase();
      card.style.display = text.includes(query) ? "" : "none";
    });
  });
}

if (terminalRun) {
  terminalRun.addEventListener("click", () => {
    const value = terminalInput.value.trim();
    if (!value) return;
    runCommand(value, "Comando ejecutado en simulacion.");
    terminalInput.value = "";
  });
}

if (terminalInput) {
  terminalInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      terminalRun.click();
    }
  });
}
