const sections = [
  {
    title: "Section 1: Content Ownership & Authority",
    items: [
      {
        id: "responsible_parties",
        label: "Who was considered responsible for each website section?",
        type: "text"
      },
      { id: "formal_owner", label: "Was a formal Content Owner assigned per section?", type: "yesno" },
      { id: "single_approver", label: "Is there one single authority approving all website content?", type: "yesno" },
      { id: "multiple_stakeholders", label: "Were multiple stakeholders approving content separately?", type: "yesno" },
      { id: "we_created_content", label: "Were we responsible for creating the content?", type: "yesno" },
      { id: "formatting_only", label: "Were we only responsible for formatting and organizing content?", type: "yesno" },
      { id: "assigned_to_build", label: "Were we formally assigned to build the content?", type: "yesno" },
      { id: "client_final_authority", label: "Is there a client-side authority with final approval rights?", type: "yesno" },
      { id: "written_approvals", label: "Were any written approvals issued previously?", type: "yesno" },
      { id: "ownership_in_writing", label: "Has ownership ever been clearly communicated in writing?", type: "yesno" },
      { id: "decision_maker_identified", label: "Is there currently a clearly identified final decision-maker before publishing any page?", type: "yesno" }
    ]
  },
  {
    title: "Section 2: Content Source & Development History",
    items: [
      { id: "from_old_website", label: "Was the content sourced from the old website?", type: "yesno" },
      { id: "new_content_from_client", label: "Was new content officially provided by the client?", type: "yesno" },
      { id: "team_initial_drafts", label: "Did our team develop initial drafts?", type: "yesno" },
      { id: "jointly_developed", label: "Was content developed jointly?", type: "yesno" },
      { id: "modified_by_departments", label: "Were drafts modified by multiple departments?", type: "yesno" },
      { id: "from_multiple_sections", label: "Did content come from multiple sections or departments?", type: "yesno" },
      { id: "english_then_arabic", label: "Was English developed first and Arabic translated later?", type: "yesno" },
      { id: "arabic_then_english", label: "Was Arabic developed first and English translated later?", type: "yesno" },
      { id: "parallel_languages", label: "Were both languages developed in parallel?", type: "yesno" },
      { id: "translation_after_approval", label: "Was translation done after final approval of the source language?", type: "yesno" },
      { id: "documented_final_version", label: "Was any version ever documented as final?", type: "yesno" },
      { id: "confirmed_master_version", label: "Is there currently a confirmed master version?", type: "yesno" }
    ]
  },
  {
    title: "Section 3: Previous Review Workflow",
    items: [
      { id: "comments_multiple_channels", label: "Were comments shared through multiple channels?", type: "yesno" },
      { id: "comments_consolidated", label: "Were comments consolidated into one document?", type: "yesno" },
      { id: "structured_review_session", label: "Was there a structured review session?", type: "yesno" },
      { id: "revisions_tracked", label: "Were revisions documented and tracked?", type: "yesno" },
      { id: "version_control_clear", label: "Was there a clear version control mechanism?", type: "yesno" },
      { id: "freeze_point_defined", label: "Was there a defined freeze point before planned publishing?", type: "yesno" },
      { id: "formal_signoff", label: "Was there a formal sign-off before any go-live plan?", type: "yesno" },
      { id: "changes_after_informal_approval", label: "Were changes introduced after informal approvals?", type: "yesno" },
      { id: "full_site_review", label: "Was there ever a complete full-site review in one sitting?", type: "yesno" }
    ]
  },
  {
    title: "Section 4: Translation & Alignment Integrity",
    items: [
      { id: "translation_owner_assigned", label: "Was there a clearly assigned translation owner?", type: "yesno" },
      { id: "translation_during_changes", label: "Was translation conducted while content was still changing?", type: "yesno" },
      { id: "alignment_validated", label: "Was bilingual alignment validated side-by-side?", type: "yesno" },
      { id: "language_contradictions", label: "Were there contradictions between English and Arabic?", type: "yesno" },
      { id: "late_stage_inconsistencies", label: "Were inconsistencies identified only at a late stage?", type: "yesno" },
      { id: "semantic_mismatch", label: "Is there semantic mismatch between both versions?", type: "yesno" },
      { id: "factual_validation_both_languages", label: "Was factual validation performed in both languages?", type: "yesno" }
    ]
  },
  {
    title: "Section 5: Contractual & Scope Clarity (Internal Reflection)",
    items: [
      { id: "contract_defines_ownership", label: "Does our contract clearly define content ownership?", type: "yesno" },
      { id: "contract_defines_accuracy", label: "Does it define who is responsible for factual accuracy?", type: "yesno" },
      { id: "responsible_for_translation", label: "Are we officially responsible for translation?", type: "yesno" },
      { id: "documented_approvals", label: "Do we have documented approvals protecting us?", type: "yesno" },
      { id: "outside_scope", label: "Are we currently operating outside defined scope?", type: "yesno" }
    ]
  },
  {
    title: "Section 6: Direct Clarification Questions for the Client",
    items: [
      { id: "nominate_reference", label: "Would you like to nominate one final reference per section?", type: "yesno" },
      { id: "validate_before_upload", label: "Should content be fully validated internally before upload?", type: "yesno" },
      { id: "consolidated_review_sessions", label: "Would you prefer consolidated review sessions instead of scattered comments?", type: "yesno" },
      { id: "one_final_version", label: "Should there be one confirmed final version before publishing?", type: "yesno" },
      { id: "freeze_for_launch", label: "Would you like to freeze approved content for launch and handle later updates separately?", type: "yesno" },
      { id: "official_content_followed", label: "Is there official content that must be strictly followed?", type: "yesno" },
      { id: "we_lead_content", label: "Do you prefer that we lead content development fully?", type: "yesno" },
      { id: "content_from_client_side", label: "Or should content primarily come from your side?", type: "yesno" }
    ]
  }
];

const form = document.getElementById("diagnosticForm");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");
const TARGET_EMAIL = "dsinai@calx.sa";
const STATIC_EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

function renderForm() {
  sections.forEach((section, sectionIndex) => {
    if (sectionIndex > 0) {
      const separator = document.createElement("p");
      separator.className = "section-separator";
      separator.textContent = "---";
      form.appendChild(separator);
    }

    const sectionNode = document.createElement("section");
    sectionNode.className = "section";

    const title = document.createElement("h2");
    title.textContent = section.title;
    sectionNode.appendChild(title);

    section.items.forEach((item, itemIndex) => {
      const wrapper = document.createElement("div");
      wrapper.className = "question";

      const questionText = document.createElement("p");
      questionText.className = "question-text";
      questionText.textContent = `${itemIndex + 1}. ${item.label}`;
      wrapper.appendChild(questionText);

      if (item.type === "text") {
        const answerLabel = document.createElement("p");
        answerLabel.className = "answer-label";
        answerLabel.textContent = "Answer:";
        wrapper.appendChild(answerLabel);

        const textArea = document.createElement("textarea");
        textArea.id = item.id;
        textArea.name = item.id;
        textArea.placeholder = "Type your answer";
        wrapper.appendChild(textArea);
      } else {
        const radioGroup = document.createElement("div");
        radioGroup.className = "radio-group";

        ["Yes", "No"].forEach((choice) => {
          const radioLabel = document.createElement("label");
          const radio = document.createElement("input");
          radio.type = "radio";
          radio.name = item.id;
          radio.value = choice;
          radioLabel.appendChild(radio);
          radioLabel.appendChild(document.createTextNode(choice));
          radioGroup.appendChild(radioLabel);
        });

        wrapper.appendChild(radioGroup);
      }

      sectionNode.appendChild(wrapper);
    });

    form.appendChild(sectionNode);
  });
}

function collectAnswers() {
  return sections.map((section) => ({
    sectionTitle: section.title,
    items: section.items.map((item) => {
      let value = "";
      if (item.type === "text") {
        const input = document.getElementById(item.id);
        value = input ? input.value.trim() : "";
      } else {
        const selected = document.querySelector(`input[name="${item.id}"]:checked`);
        value = selected ? selected.value : "";
      }

      return {
        id: item.id,
        label: item.label,
        value
      };
    })
  }));
}

function buildEmailMessage(payload) {
  const lines = [];
  lines.push("Website Content Diagnostic Sheet - New Submission");
  lines.push("");
  lines.push(`Name: ${payload.respondent.name || "N/A"}`);
  lines.push(`Company: ${payload.respondent.company || "N/A"}`);
  lines.push(`Email: ${payload.respondent.email || "N/A"}`);
  lines.push(`Phone: ${payload.respondent.phone || "N/A"}`);
  lines.push("");

  for (const section of payload.answers) {
    lines.push(section.sectionTitle);
    for (const item of section.items) {
      lines.push(`- ${item.label}: ${item.value || "Not answered"}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function isGitHubPagesHost() {
  return window.location.hostname.endsWith("github.io");
}

async function submitToBackend(payload) {
  const response = await fetch("/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(
      (data && data.error) ||
      "Submission failed. The backend endpoint is unavailable."
    );
  }
}

async function submitToFormSubmit(payload) {
  const response = await fetch(STATIC_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: payload.respondent.name || "Anonymous",
      email: payload.respondent.email || "noreply@calx.sa",
      company: payload.respondent.company || "N/A",
      phone: payload.respondent.phone || "N/A",
      message: buildEmailMessage(payload),
      _subject: "Website Content Diagnostic - New Response",
      _captcha: "false",
      _template: "table"
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      data.message || "Email submission failed. Please try again."
    );
  }
}

async function submitForm() {
  submitBtn.disabled = true;
  result.className = "";

  const payload = {
    respondent: {
      name: document.getElementById("respondentName").value.trim(),
      company: document.getElementById("respondentCompany").value.trim(),
      email: document.getElementById("respondentEmail").value.trim(),
      phone: document.getElementById("respondentPhone").value.trim()
    },
    answers: collectAnswers()
  };

  try {
    if (location.protocol === "file:") {
      throw new Error(
        "Open this from GitHub Pages URL or local server, not directly as a file."
      );
    }

    result.textContent = "Submitting...";

    if (isGitHubPagesHost()) {
      await submitToFormSubmit(payload);
      result.className = "success";
      result.textContent =
        "Submitted successfully to dsinai@calx.sa. First submission may require email activation in inbox.";
    } else {
      await submitToBackend(payload);
      result.className = "success";
      result.textContent = "Submitted successfully. Feedback was sent.";
    }
  } catch (error) {
    result.className = "error";
    result.textContent = `Submission failed: ${error.message}`;
  } finally {
    submitBtn.disabled = false;
  }
}

submitBtn.addEventListener("click", submitForm);
renderForm();
