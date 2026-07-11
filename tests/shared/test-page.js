/*
 * tests/shared/test-page.js
 * Gemeinsames Shared JavaScript für dauerhafte Testseiten (docs/testing/TEST_PAGE_STANDARD.md §9/§11).
 *
 * Zweck: technische JavaScript-/Ladefehler SICHTBAR machen, nicht nur in der Konsole.
 * Bewertet nichts Fachliches, meldet nie "bestanden" oder "funktioniert" — nur die reine
 * Existenz eines technischen Fehlers.
 *
 * Vanilla JavaScript, kein Modulzwang, keine externe Bibliothek. Darf auch ohne die üblichen
 * Testseiten-Marker (z. B. auf tests/index.html) folgenlos laden.
 */
(function () {
  "use strict";

  function getStatusEl() {
    return document.querySelector("[data-fw-runtime-status]");
  }

  function getErrorsSection() {
    return document.querySelector("[data-fw-test-errors]");
  }

  function getErrorList() {
    return document.querySelector("[data-fw-test-error-list]");
  }

  function normalize(error, context) {
    var message = "";
    var file = "";
    var line = "";
    var col = "";

    if (error instanceof Error) {
      message = error.message || String(error);
      var stackFirstLine = (error.stack || "").split("\n")[1] || "";
      var m = stackFirstLine.match(/([^\s(]+):(\d+):(\d+)\)?$/);
      if (m) {
        file = m[1];
        line = m[2];
        col = m[3];
      }
    } else if (typeof error === "string") {
      message = error;
    } else if (error && typeof error === "object") {
      try {
        message = JSON.stringify(error);
      } catch (e) {
        message = String(error);
      }
    } else {
      message = String(error);
    }

    return {
      message: message || "(keine Fehlermeldung verfügbar)",
      context: context || "",
      file: file,
      line: line,
      col: col
    };
  }

  function renderError(entry) {
    var list = getErrorList();
    var section = getErrorsSection();
    var status = getStatusEl();

    if (list) {
      var li = document.createElement("li");

      var msgLine = document.createElement("div");
      msgLine.textContent = "FEHLER: " + entry.message;
      li.appendChild(msgLine);

      if (entry.context) {
        var ctxLine = document.createElement("div");
        ctxLine.textContent = "Kontext: " + entry.context;
        li.appendChild(ctxLine);
      }

      if (entry.file) {
        var fileLine = document.createElement("div");
        fileLine.textContent = "Datei: " + entry.file;
        li.appendChild(fileLine);
      }

      if (entry.line) {
        var lineLine = document.createElement("div");
        lineLine.textContent = "Zeile: " + entry.line + (entry.col ? (", Spalte: " + entry.col) : "");
        li.appendChild(lineLine);
      }

      list.appendChild(li);
    }

    if (section) {
      section.hidden = false;
    }

    if (status) {
      status.textContent = "FEHLER – mindestens ein technischer Fehler wurde erkannt.";
      status.classList.add("is-error");
    }

    console.error("[FwTestPage]", entry.message, entry.context || "", entry.file || "", entry.line || "");
  }

  function reportError(error, context) {
    renderError(normalize(error, context));
  }

  // Laufzeitfehler UND (im Capturing) Ressourcenladefehler (img/script/link).
  window.addEventListener("error", function (event) {
    if (event && event.error) {
      var entry = normalize(event.error, undefined);
      if (!entry.file && event.filename) {
        entry.file = event.filename;
      }
      if (!entry.line && event.lineno) {
        entry.line = String(event.lineno);
      }
      if (!entry.col && event.colno) {
        entry.col = String(event.colno);
      }
      renderError(entry);
      return;
    }

    // Ressourcenfehler (z. B. defektes <script src> oder <link href>) ohne event.error.
    var target = event && event.target;
    if (target && target !== window && target.tagName) {
      var src = target.src || target.href || "(unbekannte Ressource)";
      renderError(normalize("Ressource konnte nicht geladen werden: " + src, "Ressourcenfehler (" + target.tagName.toLowerCase() + ")"));
      return;
    }

    if (event && event.message) {
      var e2 = normalize(event.message, undefined);
      if (event.filename) { e2.file = event.filename; }
      if (event.lineno) { e2.line = String(event.lineno); }
      if (event.colno) { e2.col = String(event.colno); }
      renderError(e2);
    }
    // Event bewusst nicht mit preventDefault() verschlucken.
  }, true);

  window.addEventListener("unhandledrejection", function (event) {
    var reason = event && "reason" in event ? event.reason : event;
    renderError(normalize(reason, "unhandledrejection"));
    // Event bewusst nicht mit preventDefault() verschlucken.
  });

  window.FwTestPage = window.FwTestPage || {};
  window.FwTestPage.reportError = reportError;
})();
