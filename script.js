// Pagination functionality
let currentPage = 1;
const itemsPerPage = 5;
const totalItems = 20;
const totalPages = Math.ceil(totalItems / itemsPerPage);

function updatePagination() {
  document.getElementById("currentPage").textContent = currentPage;
  document.getElementById("totalPages").textContent = totalPages;

  const errorItems = document.querySelectorAll(".wd-error-item");
  errorItems.forEach((item, index) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    item.style.display =
      index >= startIndex && index < endIndex ? "flex" : "none";
  });
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePagination();
  }
}

// Initialize pagination
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".wd-error-item")) {
    updatePagination();
  }
});

// Secondary sidebar toggle
function toggleSecondarySidebar() {
  const secondarySidebar = document.querySelector(".wd-secondary-sidebar");
  const mainContent = document.querySelector(".wd-main-content");
  const contentBody = document.querySelector(".wd-content-body");
  const contentHeader = document.querySelector(".wd-content-header");

  secondarySidebar.classList.toggle("hidden");
  mainContent.classList.toggle("secondary-hidden");
  contentBody.classList.toggle("secondary-hidden");
  contentHeader.classList.toggle("secondary-hidden");

  // حفظ حالة القسم الثاني
  if (secondarySidebar.classList.contains("hidden")) {
    localStorage.setItem("secondarySidebarHidden", "true");
  } else {
    localStorage.setItem("secondarySidebarHidden", "false");
  }
}

// تحميل حالة القسم الثاني عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  const secondarySidebar = document.querySelector(".wd-secondary-sidebar");
  const mainContent = document.querySelector(".wd-main-content");
  const contentBody = document.querySelector(".wd-content-body");
  const contentHeader = document.querySelector(".wd-content-header");

  // التحقق من وجود حالة محفوظة
  const savedState = localStorage.getItem("secondarySidebarHidden");
  if (savedState === "true") {
    secondarySidebar.classList.add("hidden");
    mainContent.classList.add("secondary-hidden");
    contentBody.classList.add("secondary-hidden");
    contentHeader.classList.add("secondary-hidden");
  }
});

// Filter dropdown functionality
function toggleFilterDropdown() {
  const dropdown = document.querySelector(".wd-filter-dropdown");
  dropdown.classList.toggle("hidden");
}

function toggleSubmenu(submenuId) {
  const submenu = document.getElementById(submenuId);
  submenu.classList.toggle("hidden");
}

function updateOptionHeader(optionId, value) {
  const header = document.querySelector(
    `#${optionId} .wd-filter-option-header span`
  );
  header.textContent = value;
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".wd-filter-dropdown");
  const filterBtn = document.querySelector(".wd-filter-action-btn");

  if (dropdown && filterBtn) {
    if (!dropdown.contains(event.target) && !filterBtn.contains(event.target)) {
      dropdown.classList.add("hidden");
    }
  }
});

// Chat sidebar toggle
function toggleChatSidebar() {
  const chatSidebar = document.querySelector(".wd-chat-sidebar");
  const chatMain = document.querySelector(".wd-chat-main");
  const expandBtn = document.querySelector(".wd-chat-expand-btn i");

  chatSidebar.classList.toggle("expanded");
  chatMain.classList.toggle("hidden");

  if (chatSidebar.classList.contains("expanded")) {
    expandBtn.classList.remove("fa-expand");
    expandBtn.classList.add("fa-compress");
    // حفظ حالة التكبير
    localStorage.setItem("chatSidebarExpanded", "true");
  } else {
    expandBtn.classList.remove("fa-compress");
    expandBtn.classList.add("fa-expand");
    // حفظ حالة التصغير
    localStorage.setItem("chatSidebarExpanded", "false");
  }
}

// تحميل حالة قسم المحادثات عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  const chatSidebar = document.querySelector(".wd-chat-sidebar");
  const chatMain = document.querySelector(".wd-chat-main");
  const expandBtn = document.querySelector(".wd-chat-expand-btn i");

  // التحقق من وجود حالة محفوظة
  const savedState = localStorage.getItem("chatSidebarExpanded");
  if (savedState === "true") {
    chatSidebar.classList.add("expanded");
    chatMain.classList.add("hidden");
    expandBtn.classList.remove("fa-expand");
    expandBtn.classList.add("fa-compress");
  }
});

// Activate chats
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".wd-chat-item")) {
    document.querySelectorAll(".wd-chat-item").forEach((item) => {
      item.addEventListener("click", function () {
        // Remove active class from all chats
        document.querySelectorAll(".wd-chat-item").forEach((chat) => {
          chat.classList.remove("active");
        });

        // Add active class to selected chat
        this.classList.add("active");

        // Hide default content
        const defaultContent = document.querySelector(".wd-chat-default");
        defaultContent.classList.add("hidden");

        // Show chat window and input field
        const chatContent = document.querySelector(".wd-chat-content");
        chatContent.classList.remove("hidden");

        // Check expand button state
        const expandBtn = document.querySelector(".wd-chat-expand-btn i");
        const chatSidebar = document.querySelector(".wd-chat-sidebar");
        const chatMain = document.querySelector(".wd-chat-main");

        if (expandBtn.classList.contains("fa-compress")) {
          chatSidebar.classList.add("hidden");
          chatMain.classList.remove("hidden");
          expandBtn.classList.remove("fa-compress");
          expandBtn.classList.add("fa-expand");
        }
      });
    });
  }
});

// Toggle conversation status menu
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".wd-conversation-status-btn")) {
    document
      .querySelector(".wd-conversation-status-btn")
      .addEventListener("click", function (e) {
        e.stopPropagation();
        const menu = this.nextElementSibling;
        menu.classList.toggle("active");
      });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      const menu = document.querySelector(".wd-conversation-status-menu");
      if (menu && !menu.contains(e.target)) {
        menu.classList.remove("active");
      }
    });

    // Update conversation status when selecting an option
    document
      .querySelectorAll(".wd-conversation-status-item")
      .forEach((item) => {
        item.addEventListener("click", function () {
          const statusBtn = document.querySelector(
            ".wd-conversation-status-btn"
          );
          const icon = this.querySelector("i").cloneNode(true);
          const text = this.querySelector("span").textContent;

          statusBtn.innerHTML = "";
          statusBtn.appendChild(icon);
          statusBtn.appendChild(document.createTextNode(text));
          statusBtn.appendChild(document.createElement("i")).className =
            "fas fa-chevron-down";

          document
            .querySelector(".wd-conversation-status-menu")
            .classList.remove("active");
        });
      });
  }
});

// Go back to chat list
function goBackToSidebar() {
  // Hide chat content
  const chatContent = document.querySelector(".wd-chat-content");
  chatContent.classList.add("hidden");

  // Show default content
  const defaultContent = document.querySelector(".wd-chat-default");
  defaultContent.classList.add("hidden");

  // Show chat sidebar
  const chatSidebar = document.querySelector(".wd-chat-sidebar");
  chatSidebar.classList.remove("hidden");

  // Remove active class from all chats
  document.querySelectorAll(".wd-chat-item").forEach((chat) => {
    chat.classList.remove("active");
  });

  // Reset expand button
  const expandBtn = document.querySelector(".wd-chat-expand-btn i");
  expandBtn.classList.remove("fa-compress");
  expandBtn.classList.add("fa-expand");

  // Reset chat sidebar and main content based on saved state
  const chatMain = document.querySelector(".wd-chat-main");
  const savedState = localStorage.getItem("chatSidebarExpanded");

  if (savedState === "true") {
    chatSidebar.classList.add("expanded");
    chatMain.classList.add("hidden");
    expandBtn.classList.remove("fa-expand");
    expandBtn.classList.add("fa-compress");
  } else {
    chatSidebar.classList.remove("expanded");
    chatSidebar.classList.remove("hidden");
    chatMain.classList.remove("hidden");
  }
}

// Message type buttons
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".wd-reply-type-btn")) {
    // Activate reply button
    document
      .querySelector(".wd-reply-type-btn")
      .addEventListener("click", function () {
        this.classList.toggle("active");
        const noteBtn = document.querySelector(".wd-note-type-btn");
        if (noteBtn.classList.contains("active")) {
          noteBtn.classList.remove("active");
        }

        // Reset colors
        const messageInput = document.querySelector("#messageInput");
        const messageActions = document.querySelector(".wd-message-actions");
        const sendBtn = document.querySelector(".wd-send-btn");

        messageInput.style.backgroundColor = "";
        messageActions.style.backgroundColor = "";
        sendBtn.style.backgroundColor = "#00BC60";
        sendBtn.style.color = "#fff";
      });

    // Activate note button
    document
      .querySelector(".wd-note-type-btn")
      .addEventListener("click", function () {
        this.classList.toggle("active");
        const replyBtn = document.querySelector(".wd-reply-type-btn");
        if (replyBtn.classList.contains("active")) {
          replyBtn.classList.remove("active");
        }

        // Check note button state and change colors
        const messageInput = document.querySelector("#messageInput");
        const messageActions = document.querySelector(".wd-message-actions");
        const sendBtn = document.querySelector(".wd-send-btn");

        if (this.classList.contains("active")) {
          messageInput.style.backgroundColor = "#fffbd1";
          messageActions.style.backgroundColor = "#fffbd1";
          sendBtn.style.backgroundColor = "#ffd700";
          sendBtn.style.color = "#333";
        } else {
          messageInput.style.backgroundColor = "";
          messageActions.style.backgroundColor = "";
          sendBtn.style.backgroundColor = "#00BC60";
          sendBtn.style.color = "#fff";
        }
      });
  }
});

// Shortcuts menu
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("messageInput")) {
    const messageInput = document.getElementById("messageInput");
    const shortcutsMenu = document.querySelector(".wd-shortcuts-menu");

    messageInput.addEventListener("input", function (e) {
      if (e.target.value.startsWith("/")) {
        shortcutsMenu.classList.remove("hidden");
      } else {
        shortcutsMenu.classList.add("hidden");
      }
    });

    // Add shortcut description to message box when clicked
    document.querySelectorAll(".wd-shortcut-item").forEach((item) => {
      item.addEventListener("click", function () {
        const desc = this.querySelector(".wd-shortcut-desc").textContent;
        messageInput.value = desc;
        shortcutsMenu.classList.add("hidden");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !messageInput.contains(e.target) &&
        !shortcutsMenu.contains(e.target)
      ) {
        shortcutsMenu.classList.add("hidden");
      }
    });
  }
});

function toggleContactInfo() {
  const sidebar = document.querySelector(".wd-contact-info-sidebar");
  const chatContent = document.querySelector(".wd-chat-content");
  const toggleButton = document.querySelector(".wd-contact-info-toggle i");

  sidebar.classList.toggle("active");
  chatContent.classList.toggle("sidebar-active");

  if (sidebar.classList.contains("active")) {
    toggleButton.classList.remove("fa-chevron-right");
    toggleButton.classList.add("fa-chevron-left");
  } else {
    toggleButton.classList.remove("fa-chevron-left");
    toggleButton.classList.add("fa-chevron-right");
  }
}

// Copy text to clipboard
function copyText(text) {
  // Use the Clipboard API to copy text
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Show success message
      const toast = document.createElement("div");
      toast.className = "wd-toast";
      toast.textContent = "تم نسخ النص بنجاح";
      document.body.appendChild(toast);

      // Remove toast after 2 seconds
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

// التحكم في قائمة الحساب العائمة
const profileBtn = document.querySelector(".wd-profile-floating-btn");
const profileMenu = document.querySelector(".wd-profile-floating-menu");
const statusOptions = document.querySelectorAll(
  ".wd-profile-floating-status-option"
);

// فتح وإغلاق القائمة
profileBtn.addEventListener("click", () => {
  profileMenu.classList.toggle("show");
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.classList.remove("show");
  }
});

// تغيير حالة المستخدم
statusOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // إزالة الفئة النشطة من جميع الخيارات
    statusOptions.forEach((opt) => opt.classList.remove("active"));
    // إضافة الفئة النشطة للخيار المحدد
    option.classList.add("active");

    // تغيير لون زر الحساب حسب الحالة
    const status = option.getAttribute("data-status");
    if (status === "available") {
      profileBtn.style.background = "#00BC60";
    } else if (status === "busy") {
      profileBtn.style.background = "#FFD700";
    } else {
      profileBtn.style.background = "#666";
    }
  });
});

// Emoji Picker Functionality
const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.querySelector(".wd-emoji-picker");
const emojiList = document.querySelector(".wd-emoji-list");
const messageInput = document.getElementById("messageInput");

// Emoji categories and their emojis
const emojiCategories = {
  recent: ["😀", "😂", "❤️", "👍", "🙏"],
  smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"],
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"],
  food: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒"],
  activities: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸"],
  travel: ["✈️", "🚀", "🚁", "🚂", "🚢", "🚗", "🚕", "🚙", "🚌", "🚎"],
  objects: ["💡", "📱", "💻", "⌚", "📷", "🎥", "📺", "🔦", "📡", "🔌"],
  symbols: ["❤️", "💛", "💚", "💙", "💜", "🖤", "💔", "❣️", "💕", "💞"],
};

// Load emojis for a category
function loadEmojis(category) {
  emojiList.innerHTML = "";
  emojiCategories[category].forEach((emoji) => {
    const emojiItem = document.createElement("div");
    emojiItem.className = "wd-emoji-item";
    emojiItem.textContent = emoji;
    emojiItem.addEventListener("click", () => {
      messageInput.value += emoji;
      messageInput.focus();
    });
    emojiList.appendChild(emojiItem);
  });
}

// Toggle emoji picker
emojiBtn.addEventListener("click", () => {
  emojiPicker.classList.toggle("hidden");
  if (!emojiPicker.classList.contains("hidden")) {
    loadEmojis("recent");
  }
});

// Handle emoji category selection
document.querySelectorAll(".wd-emoji-category").forEach((category) => {
  category.addEventListener("click", () => {
    document
      .querySelector(".wd-emoji-category.active")
      .classList.remove("active");
    category.classList.add("active");
    loadEmojis(category.dataset.category);
  });
});

// File Upload Functionality
const imageBtn = document.getElementById("imageBtn");
const videoBtn = document.getElementById("videoBtn");
const fileBtn = document.getElementById("fileBtn");
const imageInput = document.getElementById("imageInput");
const videoInput = document.getElementById("videoInput");
const fileInput = document.getElementById("fileInput");

// Handle file uploads
function handleFileUpload(input, type) {
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.createElement("div");
        preview.className = "wd-file-preview";

        if (type === "image") {
          preview.innerHTML = `
            <img src="${e.target.result}" alt="${file.name}">
            <div class="wd-file-info">
              <div class="wd-file-name">${file.name}</div>
              <div class="wd-file-size">${formatFileSize(file.size)}</div>
            </div>
            <div class="wd-file-remove">×</div>
          `;
        } else if (type === "video") {
          preview.innerHTML = `
            <video src="${e.target.result}" controls></video>
            <div class="wd-file-info">
              <div class="wd-file-name">${file.name}</div>
              <div class="wd-file-size">${formatFileSize(file.size)}</div>
            </div>
            <div class="wd-file-remove">×</div>
          `;
        } else {
          preview.innerHTML = `
            <i class="fas fa-file"></i>
            <div class="wd-file-info">
              <div class="wd-file-name">${file.name}</div>
              <div class="wd-file-size">${formatFileSize(file.size)}</div>
            </div>
            <div class="wd-file-remove">×</div>
          `;
        }

        const messagePreview =
          document.querySelector(".wd-message-preview") ||
          document.createElement("div");
        messagePreview.className = "wd-message-preview";
        messagePreview.appendChild(preview);
        document.querySelector(".wd-message-input").appendChild(messagePreview);

        // Handle file removal
        preview
          .querySelector(".wd-file-remove")
          .addEventListener("click", () => {
            preview.remove();
            if (messagePreview.children.length === 0) {
              messagePreview.remove();
            }
          });
      };
      reader.readAsDataURL(file);
    }
  });
}

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Initialize file upload handlers
handleFileUpload(imageInput, "image");
handleFileUpload(videoInput, "video");
handleFileUpload(fileInput, "file");

// Trigger file input clicks
imageBtn.addEventListener("click", () => imageInput.click());
videoBtn.addEventListener("click", () => videoInput.click());
fileBtn.addEventListener("click", () => fileInput.click());

// Voice Recording Functionality
const voiceBtn = document.getElementById("voiceBtn");
let mediaRecorder;
let audioChunks = [];
let isRecording = false;

// Start recording
async function startRecording() {
  try {
    // Request microphone permissions
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create audio preview
      const audioPreview = document.createElement("audio");
      audioPreview.src = audioUrl;
      audioPreview.controls = true;
      audioPreview.style.width = "250px";

      // Add to message preview
      const messagePreview =
        document.querySelector(".wd-message-preview") ||
        document.createElement("div");
      messagePreview.className = "wd-message-preview";
      messagePreview.innerHTML = "";
      messagePreview.appendChild(audioPreview);

      // Add to message input area if not already there
      if (!document.querySelector(".wd-message-preview")) {
        document.querySelector(".wd-message-input").appendChild(messagePreview);
      }
    };

    // Start recording with 100ms timeslice for better performance
    mediaRecorder.start(100);
    isRecording = true;

    // Update button appearance
    voiceBtn.classList.add("recording");
    voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';

    // Add recording indicator
    const recordingIndicator = document.createElement("div");
    recordingIndicator.className = "wd-recording-indicator";
    recordingIndicator.innerHTML = '<i class="fas fa-circle"></i> تسجيل...';
    document
      .querySelector(".wd-message-actions")
      .appendChild(recordingIndicator);
  } catch (err) {
    console.error("Error accessing microphone:", err);
    alert("تعذر الوصول إلى الميكروفون. يرجى التحقق من الإعدادات وإعطاء الإذن.");
    voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
  }
}

// Stop recording
function stopRecording() {
  if (mediaRecorder && isRecording) {
    try {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      isRecording = false;

      // Update button appearance
      voiceBtn.classList.remove("recording");
      voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';

      // Remove recording indicator
      const indicator = document.querySelector(".wd-recording-indicator");
      if (indicator) {
        indicator.remove();
      }
    } catch (err) {
      console.error("Error stopping recording:", err);
      alert("حدث خطأ أثناء إيقاف التسجيل");
    }
  }
}

// Toggle recording
voiceBtn.addEventListener("click", () => {
  if (!isRecording) {
    startRecording();
  } else {
    stopRecording();
  }
});

// Stop recording if user leaves the page
window.addEventListener("beforeunload", () => {
  if (isRecording) {
    stopRecording();
  }
});

// Message Template Functionality
const templateBtn = document.getElementById("templateBtn");
const templatePicker = document.createElement("div");
templatePicker.className = "wd-template-picker hidden";
templatePicker.innerHTML = `
  <div class="wd-template-categories">
    <div class="wd-template-category active" data-category="greetings">الترحيب</div>
    <div class="wd-template-category" data-category="support">الدعم الفني</div>
    <div class="wd-template-category" data-category="sales">المبيعات</div>
    <div class="wd-template-category" data-category="marketing">التسويق</div>
  </div>
  <div class="wd-template-list">
    <!-- Templates will be loaded here -->
  </div>
`;

// WhatsApp templates
const whatsappTemplates = {
  greetings: [
    {
      title: "ترحيب عام",
      content: "مرحباً بك في خدمة العملاء! كيف يمكنني مساعدتك اليوم؟",
    },
    {
      title: "ترحيب بالاسم",
      content: "مرحباً {name}! يسعدنا تواصلك معنا. كيف يمكننا مساعدتك؟",
    },
  ],
  support: [
    {
      title: "طلب معلومات",
      content:
        "نشكرك على تواصلك معنا. هل يمكنك تزويدنا بمزيد من المعلومات حول المشكلة التي تواجهها؟",
    },
    {
      title: "حل المشكلة",
      content:
        "نفهم مشكلتك. سنقوم بمساعدتك في حل هذه المشكلة في أقرب وقت ممكن.",
    },
  ],
  sales: [
    {
      title: "عرض المنتج",
      content:
        "نقدم لك عرضاً خاصاً على منتجنا {product}. هل ترغب في معرفة المزيد؟",
    },
    {
      title: "تأكيد الطلب",
      content: "تم استلام طلبك بنجاح! سنقوم بتوصيله خلال {time}.",
    },
  ],
  marketing: [
    {
      title: "عرض ترويجي",
      content:
        "استفد من عرضنا الترويجي الحصري! خصم {discount}% على جميع المنتجات.",
    },
    {
      title: "إشعار جديد",
      content: "لدينا أخبار سارة! منتجنا الجديد {product} متوفر الآن.",
    },
  ],
};

// Load templates for a category
function loadTemplates(category) {
  const templateList = templatePicker.querySelector(".wd-template-list");
  templateList.innerHTML = "";

  whatsappTemplates[category].forEach((template) => {
    const templateItem = document.createElement("div");
    templateItem.className = "wd-template-item";
    templateItem.innerHTML = `
      <div class="wd-template-title">${template.title}</div>
      <div class="wd-template-preview">${template.content}</div>
    `;

    templateItem.addEventListener("click", () => {
      const templateContent = document.createElement("div");
      templateContent.className = "wd-whatsapp-template";
      templateContent.innerHTML = `
        <div class="wd-whatsapp-header">
          <img src="imgs/whatsapp-logo.png" alt="واتساب" class="wd-whatsapp-logo">
          <div class="wd-whatsapp-title">${template.title}</div>
        </div>
        <div class="wd-whatsapp-content">${template.content}</div>
        <div class="wd-whatsapp-footer">
          <div class="wd-whatsapp-actions">
            <button class="wd-whatsapp-btn">إرسال</button>
          </div>
          <div class="wd-whatsapp-time">${new Date().toLocaleTimeString()}</div>
        </div>
      `;

      const messagePreview =
        document.querySelector(".wd-message-preview") ||
        document.createElement("div");
      messagePreview.className = "wd-message-preview";
      messagePreview.appendChild(templateContent);
      document.querySelector(".wd-message-input").appendChild(messagePreview);

      templatePicker.classList.add("hidden");
    });

    templateList.appendChild(templateItem);
  });
}

// Toggle template picker
templateBtn.addEventListener("click", () => {
  templatePicker.classList.toggle("hidden");
  if (!templatePicker.classList.contains("hidden")) {
    loadTemplates("greetings");
  }
});

// Handle template category selection
templatePicker.querySelectorAll(".wd-template-category").forEach((category) => {
  category.addEventListener("click", () => {
    templatePicker
      .querySelector(".wd-template-category.active")
      .classList.remove("active");
    category.classList.add("active");
    loadTemplates(category.dataset.category);
  });
});

// Add template picker to the DOM
document.querySelector(".wd-message-input").appendChild(templatePicker);

// Close pickers when clicking outside
document.addEventListener("click", (e) => {
  if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
    emojiPicker.classList.add("hidden");
  }

  if (!templateBtn.contains(e.target) && !templatePicker.contains(e.target)) {
    templatePicker.classList.add("hidden");
  }
});

// Message Sending Functionality
const sendBtn = document.querySelector(".wd-send-btn");
const chatWindow = document.querySelector(".wd-chat-window");

// Handle message sending
function sendMessage() {
  const messageText = messageInput.value.trim();
  const messagePreview = document.querySelector(".wd-message-preview");

  if (messageText || messagePreview) {
    // Create message element
    const messageElement = document.createElement("div");
    messageElement.className = "wd-message sent";

    // Create message content
    const messageContent = document.createElement("div");
    messageContent.className = "wd-message-content";

    // Add text content if exists
    if (messageText) {
      const textContent = document.createElement("div");
      textContent.className = "wd-message-text";
      textContent.innerHTML = messageText;
      messageContent.appendChild(textContent);
    }

    // Add preview content if exists
    if (messagePreview) {
      const previewContent = messagePreview.cloneNode(true);

      // Handle different types of content
      const imagePreview = previewContent.querySelector("img");
      const videoPreview = previewContent.querySelector("video");
      const audioPreview = previewContent.querySelector("audio");
      const filePreview = previewContent.querySelector(".wd-file-info");

      if (imagePreview) {
        const imageContainer = document.createElement("div");
        imageContainer.className = "wd-message-image";
        imagePreview.style.maxWidth = "200px";
        imagePreview.style.maxHeight = "200px";
        imagePreview.style.objectFit = "contain";
        imageContainer.appendChild(imagePreview);
        messageContent.appendChild(imageContainer);
      }

      if (videoPreview) {
        const videoContainer = document.createElement("div");
        videoContainer.className = "wd-message-video";
        videoPreview.style.maxWidth = "300px";
        videoPreview.style.maxHeight = "200px";
        videoPreview.style.objectFit = "contain";
        videoContainer.appendChild(videoPreview);
        messageContent.appendChild(videoContainer);
      }

      if (audioPreview) {
        const audioContainer = document.createElement("div");
        audioContainer.className = "wd-message-audio";
        audioPreview.style.width = "250px";
        audioContainer.appendChild(audioPreview);
        messageContent.appendChild(audioContainer);
      }

      if (filePreview) {
        const fileContainer = document.createElement("div");
        fileContainer.className = "wd-message-file";
        filePreview.style.maxWidth = "250px";
        fileContainer.appendChild(filePreview);
        messageContent.appendChild(fileContainer);
      }
    }

    // Add timestamp
    const timestamp = document.createElement("div");
    timestamp.className = "wd-message-time";
    const now = new Date();
    timestamp.textContent = `${now.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${now.toLocaleDateString("ar-SA")}`;
    messageContent.appendChild(timestamp);

    // Add message to chat window
    messageElement.appendChild(messageContent);
    chatWindow.appendChild(messageElement);

    // Clear input and preview
    messageInput.value = "";
    if (messagePreview) {
      messagePreview.remove();
    }

    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}

// Send message on button click
sendBtn.addEventListener("click", sendMessage);

// Send message on Enter key
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function createMessageElement(message, isSent) {
  const messageElement = document.createElement("div");
  messageElement.className = `wd-message ${isSent ? "sent" : "received"}`;

  // Add action menu
  const actionMenu = document.createElement("div");
  actionMenu.className = "wd-message-actions-menu";

  const replyBtn = document.createElement("button");
  replyBtn.className = "wd-message-action-btn";
  replyBtn.innerHTML = '<i class="fas fa-reply"></i>';
  replyBtn.title = "Reply";
  replyBtn.onclick = (e) => {
    e.stopPropagation();
    handleReply(message);
  };

  const forwardBtn = document.createElement("button");
  forwardBtn.className = "wd-message-action-btn";
  forwardBtn.innerHTML = '<i class="fas fa-share"></i>';
  forwardBtn.title = "Forward";
  forwardBtn.onclick = (e) => {
    e.stopPropagation();
    handleForward(message);
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "wd-message-action-btn";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    handleDelete(message);
  };

  actionMenu.appendChild(replyBtn);
  actionMenu.appendChild(forwardBtn);
  actionMenu.appendChild(deleteBtn);
  messageElement.appendChild(actionMenu);

  // Add message content
  const contentElement = document.createElement("div");
  contentElement.className = "wd-message-content";

  if (message.type === "text") {
    contentElement.textContent = message.content;
  } else if (message.type === "image") {
    const img = document.createElement("img");
    img.src = message.content;
    contentElement.appendChild(img);
  } else if (message.type === "video") {
    const video = document.createElement("video");
    video.src = message.content;
    video.controls = true;
    contentElement.appendChild(video);
  } else if (message.type === "audio") {
    const audio = document.createElement("audio");
    audio.src = message.content;
    audio.controls = true;
    contentElement.appendChild(audio);
  } else if (message.type === "file") {
    const fileLink = document.createElement("a");
    fileLink.href = message.content;
    fileLink.textContent = message.fileName;
    fileLink.download = message.fileName;
    contentElement.appendChild(fileLink);
  }

  messageElement.appendChild(contentElement);

  // Add timestamp
  const timestamp = document.createElement("div");
  timestamp.className = "wd-message-timestamp";
  timestamp.textContent = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  messageElement.appendChild(timestamp);

  return messageElement;
}

function handleReply(message) {
  // Implement reply functionality
  console.log("Replying to message:", message);
}

function handleForward(message) {
  // Implement forward functionality
  console.log("Forwarding message:", message);
}

function handleDelete(message) {
  // Implement delete functionality
  console.log("Deleting message:", message);
}

function toggleProcedures(button) {
  const dropdown = button.nextElementSibling;
  const isShowing = dropdown.classList.contains("show");

  // Hide all other dropdowns
  document
    .querySelectorAll(".wd-procedures-dropdown.show")
    .forEach((dropdown) => {
      if (dropdown !== button.nextElementSibling) {
        dropdown.classList.remove("show");
      }
    });

  // Toggle current dropdown
  dropdown.classList.toggle("show");
}

function replyMessage(button) {
  const message = button.closest(".wd-message");
  const messageContent = message.querySelector(".wd-message-content");
  const textContent = messageContent.childNodes[0].textContent.trim();
  const messageTime = message.querySelector(".wd-message-time").textContent;

  // Create reply container
  const replyContainer = document.createElement("div");
  replyContainer.className = "wd-reply-container";
  replyContainer.innerHTML = `
    <div class="wd-reply-header">
      <i class="fas fa-reply"></i>
      <span>رد على رسالة</span>
      <button class="wd-close-reply" onclick="closeReply(this)">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="wd-reply-content">
      <div class="wd-reply-text">${textContent}</div>
      <div class="wd-reply-time">${messageTime}</div>
    </div>
  `;

  // Add reply container above input
  const inputContainer = document.querySelector(".wd-message-input");
  inputContainer.parentNode.insertBefore(replyContainer, inputContainer);

  // Hide dropdown
  button.closest(".wd-procedures-dropdown").classList.remove("show");
}

function closeReply(button) {
  button.closest(".wd-reply-container").remove();
}

function addReaction(button) {
  const message = button.closest(".wd-message");
  if (!message) {
    console.error("Message element not found");
    return;
  }

  const messageContent = message.querySelector(".wd-message-content");
  if (!messageContent) {
    console.error("Message content element not found");
    return;
  }

  // Create reaction picker
  const reactionPicker = document.createElement("div");
  reactionPicker.className = "wd-reaction-picker";
  reactionPicker.innerHTML = `
    <div class="wd-reaction-grid">
      <button onclick="addEmoji(this, '👍')" class="wd-reaction-btn">
        <span class="wd-reaction-emoji">👍</span>
      </button>
      <button onclick="addEmoji(this, '❤️')" class="wd-reaction-btn">
        <span class="wd-reaction-emoji">❤️</span>
      </button>
      <button onclick="addEmoji(this, '😂')" class="wd-reaction-btn">
        <span class="wd-reaction-emoji">😂</span>
      </button>
      <button onclick="addEmoji(this, '😮')" class="wd-reaction-btn">
        <span class="wd-reaction-emoji">😮</span>
      </button>
      <button onclick="addEmoji(this, '😢')" class="wd-reaction-btn">
        <span class="wd-reaction-emoji">😢</span>
      </button>
      <button onclick="addEmoji(this, '🙏')" class="wd-reaction-btn">
        <span class="wd-reaction-emoji">🙏</span>
      </button>
    </div>
  `;

  // Position reaction picker relative to the message
  const rect = messageContent.getBoundingClientRect();
  reactionPicker.style.position = "absolute";
  reactionPicker.style.top = `${rect.top - 50}px`;
  reactionPicker.style.left = `${rect.left}px`;
  reactionPicker.style.zIndex = "1000";

  // Add to document
  document.body.appendChild(reactionPicker);

  // Hide dropdown
  const dropdown = button.closest(".wd-procedures-dropdown");
  if (dropdown) {
    dropdown.classList.remove("show");
  }

  // Close picker when clicking outside
  const closePicker = (e) => {
    if (!reactionPicker.contains(e.target)) {
      reactionPicker.remove();
      document.removeEventListener("click", closePicker);
    }
  };
  setTimeout(() => document.addEventListener("click", closePicker), 0);
}

function addEmoji(button, emoji) {
  // Find the closest message element
  const message = button.closest(".wd-message");
  if (!message) {
    console.error("Message element not found");
    return;
  }

  const messageContent = message.querySelector(".wd-message-content");
  if (!messageContent) {
    console.error("Message content element not found");
    return;
  }

  // Get or create reactions container
  let reactionsContainer = messageContent.querySelector(
    ".wd-message-reactions"
  );
  if (!reactionsContainer) {
    reactionsContainer = document.createElement("div");
    reactionsContainer.className = "wd-message-reactions";
    messageContent.appendChild(reactionsContainer);
  }

  // Check if reaction already exists
  let existingReaction = reactionsContainer.querySelector(
    `[data-emoji="${emoji}"]`
  );

  if (existingReaction) {
    // Toggle reaction
    const count = parseInt(existingReaction.dataset.count);
    if (count > 1) {
      existingReaction.dataset.count = count - 1;
      existingReaction.querySelector(".wd-reaction-count").textContent =
        count - 1;
    } else {
      existingReaction.remove();
    }
  } else {
    // Add new reaction
    const reaction = document.createElement("div");
    reaction.className = "wd-message-reaction";
    reaction.dataset.emoji = emoji;
    reaction.dataset.count = "1";
    reaction.innerHTML = `
      <span class="wd-reaction-emoji">${emoji}</span>
      <span class="wd-reaction-count">1</span>
    `;
    reactionsContainer.appendChild(reaction);
  }

  // Remove picker
  const picker = button.closest(".wd-reaction-picker");
  if (picker) {
    picker.remove();
  }
}

function copyMessage(button) {
  const message = button.closest(".wd-message");
  const messageContent = message.querySelector(".wd-message-content");
  // Get only the text content without time and date
  const textContent = messageContent.childNodes[0].textContent.trim();

  // Copy to clipboard
  navigator.clipboard.writeText(textContent).then(() => {
    // Show success feedback
    const feedback = document.createElement("div");
    feedback.className = "wd-copy-feedback";
    feedback.textContent = "تم النسخ بنجاح";
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 2000);
  });

  // Hide dropdown
  button.closest(".wd-procedures-dropdown").classList.remove("show");
}

function deleteMessage(button) {
  const message = button.closest(".wd-message");

  // Show confirmation
  if (confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
    message.remove();
  }

  // Hide dropdown
  button.closest(".wd-procedures-dropdown").classList.remove("show");
}

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".wd-procedure-btn") &&
    !e.target.closest(".wd-procedures-dropdown")
  ) {
    document
      .querySelectorAll(".wd-procedures-dropdown.show")
      .forEach((dropdown) => {
        dropdown.classList.remove("show");
      });
  }
});

// Drag and drop functionality for contact sections
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".wd-contact-section");
  let draggedSection = null;

  // Add drag and drop event listeners
  sections.forEach((section) => {
    section.addEventListener("dragstart", function (e) {
      draggedSection = this;
      this.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    section.addEventListener("dragend", function () {
      this.classList.remove("dragging");
      draggedSection = null;
    });

    section.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.classList.add("drag-over");
    });

    section.addEventListener("dragleave", function () {
      this.classList.remove("drag-over");
    });

    section.addEventListener("drop", function (e) {
      e.preventDefault();
      this.classList.remove("drag-over");

      if (draggedSection !== this) {
        const allSections = [...sections];
        const draggedIndex = allSections.indexOf(draggedSection);
        const dropIndex = allSections.indexOf(this);

        if (draggedIndex < dropIndex) {
          this.parentNode.insertBefore(draggedSection, this.nextSibling);
        } else {
          this.parentNode.insertBefore(draggedSection, this);
        }
      }
    });
  });

  // Toggle section content
  const toggleButtons = document.querySelectorAll(".wd-section-toggle");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.closest(".wd-contact-section");
      const content = section.querySelector(".wd-section-content");
      this.classList.toggle("active");
      content.classList.toggle("collapsed");
    });
  });

  // Dropdown functionality
  const dropdownButtons = document.querySelectorAll(".wd-dropdown-btn");
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const dropdown = this.nextElementSibling;
      dropdown.classList.toggle("show");
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".wd-dropdown")) {
      document.querySelectorAll(".wd-dropdown-menu").forEach((menu) => {
        menu.classList.remove("show");
      });
    }
  });

  // Handle dropdown item selection
  const dropdownItems = document.querySelectorAll(".wd-dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      const dropdown = this.closest(".wd-dropdown");
      const button = dropdown.querySelector(".wd-dropdown-btn");
      const selectedText = this.querySelector("span").textContent;
      button.querySelector("span").textContent = selectedText;
      dropdown.querySelector(".wd-dropdown-menu").classList.remove("show");
    });
  });
});

function initTagsFunctionality() {
  const tagsContainer = document.querySelector(".wd-tags-container");
  const tagsDropdown = tagsContainer.querySelector(".wd-tags-dropdown");
  const tagsSearch = tagsContainer.querySelector(".wd-tags-search-input");
  const tagsOptions = tagsContainer.querySelector(".wd-tags-options");
  const addTagBtn = tagsContainer.querySelector(".wd-add-tag-btn");

  // Available tags data
  const availableTags = [
    { id: 1, name: "عميل جديد", color: "#28a745" },
    { id: 2, name: "طلب استفسار", color: "#17a2b8" },
    { id: 3, name: "طلب دعم فني", color: "#ffc107" },
    { id: 4, name: "شكوى", color: "#dc3545" },
    { id: 5, name: "اقتراح", color: "#6f42c1" },
  ];

  // Show/hide dropdown
  addTagBtn.addEventListener("click", () => {
    tagsDropdown.classList.toggle("show");
    if (tagsDropdown.classList.contains("show")) {
      tagsSearch.focus();
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!tagsContainer.contains(e.target)) {
      tagsDropdown.classList.remove("show");
    }
  });

  // Filter tags based on search input
  tagsSearch.addEventListener("input", () => {
    const searchTerm = tagsSearch.value.toLowerCase();
    const filteredTags = availableTags.filter((tag) =>
      tag.name.toLowerCase().includes(searchTerm)
    );
    renderTagsOptions(filteredTags);
  });

  // Render tags options
  function renderTagsOptions(tags) {
    tagsOptions.innerHTML = "";
    tags.forEach((tag) => {
      const option = document.createElement("div");
      option.className = "wd-tag-option";
      option.innerHTML = `
        <div class="wd-tag-color" style="background-color: ${tag.color}"></div>
        <span>${tag.name}</span>
      `;
      option.addEventListener("click", () => addTag(tag));
      tagsOptions.appendChild(option);
    });
  }

  // Add tag to the list
  function addTag(tag) {
    const tagsList = tagsContainer.querySelector(".wd-tags-list");
    const existingTag = tagsList.querySelector(`[data-tag-id="${tag.id}"]`);

    if (!existingTag) {
      const tagElement = document.createElement("div");
      tagElement.className = "wd-tag";
      tagElement.dataset.tagId = tag.id;
      tagElement.innerHTML = `
        <div class="wd-tag-color" style="background-color: ${tag.color}"></div>
        <span>${tag.name}</span>
        <i class="fas fa-times wd-tag-remove"></i>
      `;

      const removeBtn = tagElement.querySelector(".wd-tag-remove");
      removeBtn.addEventListener("click", () => tagElement.remove());

      tagsList.appendChild(tagElement);
    }

    tagsDropdown.classList.remove("show");
    tagsSearch.value = "";
    renderTagsOptions(availableTags);
  }

  // Initial render of tags options
  renderTagsOptions(availableTags);
}

// Initialize tags functionality when the page loads
document.addEventListener("DOMContentLoaded", () => {
  initTagsFunctionality();
});
