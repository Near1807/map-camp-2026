"use client";
import { useState, useEffect, useRef } from "react";

type Line = { text: string; type: "output" | "input" | "error" | "success" | "system" };

const BOOT_SEQUENCE: Line[] = [
  { text: "ROTOM-OS v4.2.1 — Initialisation...", type: "system" },
  { text: "Chargement des modules kernel...", type: "output" },
  { text: "[OK] Module réseau chargé", type: "success" },
  { text: "[OK] Module cryptographie chargé", type: "success" },
  { text: "[WARN] Pare-feu Aether détecté", type: "error" },
  { text: "Connexion au réseau Alola-NET...", type: "output" },
  { text: "IP assignée: 10.0.4.77", type: "system" },
  { text: "Prêt. Tapez 'help' pour la liste des commandes.", type: "success" },
];

const HELP = `
Commandes disponibles:
  help          — affiche cette aide
  whoami        — identité courante
  ls            — liste les fichiers
  cat <fichier> — affiche un fichier
  nmap          — scanne le réseau
  ssh <ip>      — connexion SSH
  crack <hash>  — casse un hash
  sudo <cmd>    — exécution privilégiée
  exploit       — lance l'exploit final
  clear         — efface le terminal
`.trim();

const FILES: Record<string, string> = {
  "readme.txt": "Système de sécurité Aether v2.3\nAccès restreint — Niveau 5 requis.",
  "network.log": "10.0.4.1  — gateway\n10.0.4.12 — aether-firewall\n10.0.4.99 — aether-core [LOCKED]",
  "hash.txt": "5f4dcc3b5aa765d61d8327deb882cf99",
  "exploit.sh": "#!/bin/bash\n# Aether Core Exploit v1.0\n# Usage: ./exploit.sh\necho 'Lancement...'",
};

type Stage = "boot" | "recon" | "ssh" | "crack" | "exploit" | "done";

export function HackTerminal({ onClose, onSuccess }: { onClose: () => void; onSuccess?: () => void }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [booting, setBooting] = useState(true);
  const [stage, setStage] = useState<Stage>("boot");
  const [sshConnected, setSshConnected] = useState(false);
  const [cracked, setCracked] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let i = 0;
    let mounted = true;
    const interval = setInterval(() => {
      if (!mounted) return;
      if (i < BOOT_SEQUENCE.length) {
        const line = BOOT_SEQUENCE[i];
        if (line) setLines(prev => [...prev, line]);
        i++;
      } else {
        clearInterval(interval);
        if (mounted) {
          setBooting(false);
          setStage("recon");
        }
      }
    }, 300);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const addLine = (text: string, type: Line["type"] = "output") => {
    setLines(prev => [...prev, { text, type }]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(" ");
    const base = parts[0];
    const arg = parts.slice(1).join(" ");

    addLine(`root@alola:~$ ${cmd}`, "input");

    if (base === "clear") { setLines([]); return; }
    if (base === "help") { HELP.split("\n").forEach(l => addLine(l)); return; }
    if (base === "whoami") { addLine("root — session ROTOM-NET active"); return; }

    if (base === "ls") {
      addLine("drwxr-xr-x  2 root  readme.txt");
      addLine("drwxr-xr-x  2 root  network.log");
      addLine("drwxr-xr-x  2 root  hash.txt");
      addLine("-rwxr-xr-x  1 root  exploit.sh");
      return;
    }

    if (base === "cat") {
      const content = FILES[arg];
      if (content) {
        content.split("\n").forEach(l => addLine(l));
      } else {
        addLine(`cat: ${arg}: Aucun fichier trouvé`, "error");
      }
      return;
    }

    if (base === "nmap") {
      addLine("Starting Nmap scan...", "system");
      setTimeout(() => addLine("Scanning 10.0.4.0/24..."), 300);
      setTimeout(() => addLine("10.0.4.1   — open  [gateway]"), 600);
      setTimeout(() => addLine("10.0.4.12  — open  [aether-firewall] port 22/ssh"), 900);
      setTimeout(() => addLine("10.0.4.99  — open  [aether-core] port 22/ssh LOCKED", "error"), 1200);
      setTimeout(() => addLine("Scan terminé. 3 hôtes détectés.", "success"), 1500);
      if (stage === "recon") setStage("ssh");
      return;
    }

    if (base === "ssh") {
      if (stage === "recon") { addLine("Lance d'abord 'nmap' pour scanner le réseau.", "error"); return; }
      if (arg === "root@10.0.4.12" || arg === "10.0.4.12") {
        addLine("Connexion à 10.0.4.12...", "system");
        setTimeout(() => addLine("Authentification par clé RSA..."), 400);
        setTimeout(() => addLine("[OK] Connecté à aether-firewall", "success"), 800);
        setTimeout(() => addLine("Récupération des logs de sécurité..."), 1000);
        setTimeout(() => addLine("Hash trouvé dans /var/log/auth.log: 5f4dcc3b5aa765d61d8327deb882cf99", "success"), 1400);
        setTimeout(() => addLine("Utilise 'crack hash.txt' pour casser le hash.", "system"), 1600);
        setSshConnected(true);
        setStage("crack");
      } else {
        addLine(`ssh: connexion à ${arg} refusée`, "error");
      }
      return;
    }

    if (base === "crack") {
      if (!sshConnected) { addLine("Connecte-toi d'abord via SSH.", "error"); return; }
      addLine("Lancement de l'attaque par dictionnaire...", "system");
      setTimeout(() => addLine("[>>>>>>>>>>] 10%..."), 300);
      setTimeout(() => addLine("[>>>>>>>>>>>>>>>>>>>>] 40%..."), 700);
      setTimeout(() => addLine("[>>>>>>>>>>>>>>>>>>>>>>>>>>>>>] 65%..."), 1100);
      setTimeout(() => addLine("[>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>] 90%..."), 1500);
      setTimeout(() => addLine("Hash cassé: password → 'rotom2026'", "success"), 2000);
      setTimeout(() => addLine("Utilise 'sudo exploit' pour lancer l'exploit.", "system"), 2300);
      setCracked(true);
      setStage("exploit");
      return;
    }

    if (base === "sudo") {
      if (arg === "exploit" || arg === "./exploit.sh") {
        if (!cracked) { addLine("sudo: permission refusée — mot de passe requis", "error"); return; }
        addLine("Lancement de l'exploit Aether Core...", "system");
        setTimeout(() => addLine("[*] Injection de payload..."), 400);
        setTimeout(() => addLine("[*] Bypass du pare-feu..."), 900);
        setTimeout(() => addLine("[*] Escalade de privilèges..."), 1400);
        setTimeout(() => addLine("[*] Accès root obtenu sur aether-core", "success"), 1900);
        setTimeout(() => addLine("██████████████████████████████ 100%", "success"), 2200);
        setTimeout(() => addLine("SYSTÈME COMPROMIS — Bienvenue, administrateur.", "success"), 2600);
        setTimeout(() => { setStage("done"); onSuccess?.(); }, 3200);
      } else {
        addLine(`sudo: commande '${arg}' inconnue`, "error");
      }
      return;
    }

    if (base === "exploit") {
      addLine("Permission refusée. Utilise 'sudo exploit'.", "error");
      return;
    }

    addLine(`commande introuvable: ${base}`, "error");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  const colorClass = (type: Line["type"]) => {
    switch (type) {
      case "success": return "text-green-400";
      case "error":   return "text-red-400";
      case "system":  return "text-yellow-400";
      case "input":   return "text-white";
      default:        return "text-green-600";
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[6000] bg-black/95 flex items-center justify-center">
      <div className="border border-green-500/50 bg-black rounded-lg w-full max-w-2xl mx-4 overflow-hidden shadow-2xl">

        <div className="flex items-center justify-between px-3 py-2 border-b border-green-500/30 bg-black">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <p className="text-[10px] text-green-600 font-mono">ROTOM-TERMINAL — root@alola — bash</p>
          <button onClick={onClose} className="text-[10px] text-green-800 hover:text-green-500 font-mono transition-colors">✕</button>
        </div>

        <div
          className="p-4 h-96 overflow-y-auto flex flex-col gap-0.5 font-mono text-[11px] cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <p key={i} className={colorClass(line.type)}>{line.text}</p>
          ))}

          {!booting && stage !== "done" && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-green-400">root@alola:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-white outline-none flex-1 caret-green-400"
                spellCheck={false}
              />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-green-500/30 px-4 py-2 flex justify-between bg-black">
          <span className="text-[9px] text-green-800 font-mono">
            {stage === "done" ? "SESSION TERMINÉE" : "SESSION ACTIVE"}
          </span>
          <span className={`text-[9px] font-mono ${stage === "done" ? "text-red-500" : "text-green-600 animate-pulse"}`}>
            {stage === "done" ? "● DÉCONNECTÉ" : "● CONNECTÉ"}
          </span>
        </div>

      </div>
    </div>
  );
}