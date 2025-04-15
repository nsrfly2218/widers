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
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.wd-error-item')) {
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
}

// Filter dropdown functionality
function toggleFilterDropdown() {
  const dropdown = document.querySelector('.wd-filter-dropdown');
  dropdown.classList.toggle('hidden');
}

function toggleSubmenu(submenuId) {
  const submenu = document.getElementById(submenuId);
  submenu.classList.toggle('hidden');
}

function updateOptionHeader(optionId, value) {
  const header = document.querySelector(`#${optionId} .wd-filter-option-header span`);
  header.textContent = value;
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.wd-filter-dropdown');
  const filterBtn = document.querySelector('.wd-filter-action-btn');
  
  if (dropdown && filterBtn) {
    if (!dropdown.contains(event.target) && !filterBtn.contains(event.target)) {
      dropdown.classList.add('hidden');
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
  } else {
    expandBtn.classList.remove("fa-compress");
    expandBtn.classList.add("fa-expand");
  }
}

// Activate chats
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.wd-chat-item')) {
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
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.wd-conversation-status-btn')) {
    document.querySelector(".wd-conversation-status-btn").addEventListener("click", function(e) {
      e.stopPropagation();
      const menu = this.nextElementSibling;
      menu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(e) {
      const menu = document.querySelector(".wd-conversation-status-menu");
      if (menu && !menu.contains(e.target)) {
        menu.classList.remove("active");
      }
    });

    // Update conversation status when selecting an option
    document.querySelectorAll(".wd-conversation-status-item").forEach(item => {
      item.addEventListener("click", function() {
        const statusBtn = document.querySelector(".wd-conversation-status-btn");
        const icon = this.querySelector("i").cloneNode(true);
        const text = this.querySelector("span").textContent;
        
        statusBtn.innerHTML = '';
        statusBtn.appendChild(icon);
        statusBtn.appendChild(document.createTextNode(text));
        statusBtn.appendChild(document.createElement("i")).className = "fas fa-chevron-down";
        
        document.querySelector(".wd-conversation-status-menu").classList.remove("active");
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
  defaultContent.classList.remove("hidden");
  
  // Remove active class from all chats
  document.querySelectorAll(".wd-chat-item").forEach((chat) => {
    chat.classList.remove("active");
  });
  
  // Reset expand button
  const expandBtn = document.querySelector(".wd-chat-expand-btn i");
  expandBtn.classList.remove("fa-compress");
  expandBtn.classList.add("fa-expand");
  
  // Reset chat sidebar
  const chatSidebar = document.querySelector(".wd-chat-sidebar");
  chatSidebar.classList.remove("expanded");
  chatSidebar.classList.remove("hidden");
  
  // Reset main content
  const chatMain = document.querySelector(".wd-chat-main");
  chatMain.classList.remove("hidden");
}

// Message type buttons
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.wd-reply-type-btn')) {
    // Activate reply button
    document.querySelector('.wd-reply-type-btn').addEventListener('click', function() {
      this.classList.toggle('active');
      const noteBtn = document.querySelector('.wd-note-type-btn');
      if (noteBtn.classList.contains('active')) {
        noteBtn.classList.remove('active');
      }

      // Reset colors
      const messageInput = document.querySelector('#messageInput');
      const messageActions = document.querySelector('.wd-message-actions');
      const sendBtn = document.querySelector('.wd-send-btn');

      messageInput.style.backgroundColor = '';
      messageActions.style.backgroundColor = '';
      sendBtn.style.backgroundColor = '#00BC60';
      sendBtn.style.color = '#fff';
    });

    // Activate note button
    document.querySelector('.wd-note-type-btn').addEventListener('click', function() {
      this.classList.toggle('active');
      const replyBtn = document.querySelector('.wd-reply-type-btn');
      if (replyBtn.classList.contains('active')) {
        replyBtn.classList.remove('active');
      }

      // Check note button state and change colors
      const messageInput = document.querySelector('#messageInput');
      const messageActions = document.querySelector('.wd-message-actions');
      const sendBtn = document.querySelector('.wd-send-btn');

      if (this.classList.contains('active')) {
        messageInput.style.backgroundColor = '#fffbd1';
        messageActions.style.backgroundColor = '#fffbd1';
        sendBtn.style.backgroundColor = '#ffd700';
        sendBtn.style.color = '#333';
      } else {
        messageInput.style.backgroundColor = '';
        messageActions.style.backgroundColor = '';
        sendBtn.style.backgroundColor = '#00BC60';
        sendBtn.style.color = '#fff';
      }
    });
  }
});

// Shortcuts menu
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('messageInput')) {
    const messageInput = document.getElementById('messageInput');
    const shortcutsMenu = document.querySelector('.wd-shortcuts-menu');

    messageInput.addEventListener('input', function(e) {
      if (e.target.value.startsWith('/')) {
        shortcutsMenu.classList.remove('hidden');
      } else {
        shortcutsMenu.classList.add('hidden');
      }
    });

    // Add shortcut description to message box when clicked
    document.querySelectorAll('.wd-shortcut-item').forEach(item => {
      item.addEventListener('click', function() {
        const desc = this.querySelector('.wd-shortcut-desc').textContent;
        messageInput.value = desc;
        shortcutsMenu.classList.add('hidden');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!messageInput.contains(e.target) && !shortcutsMenu.contains(e.target)) {
        shortcutsMenu.classList.add('hidden');
      }
    });
  }
});

function toggleContactInfo() {
  const sidebar = document.querySelector('.wd-contact-info-sidebar');
  const chatContent = document.querySelector('.wd-chat-content');
  const toggleButton = document.querySelector('.wd-contact-info-toggle i');
  
  sidebar.classList.toggle('active');
  chatContent.classList.toggle('sidebar-active');
  
  if (sidebar.classList.contains('active')) {
    toggleButton.classList.remove('fa-chevron-right');
    toggleButton.classList.add('fa-chevron-left');
  } else {
    toggleButton.classList.remove('fa-chevron-left');
    toggleButton.classList.add('fa-chevron-right');
  }
}

// Copy text to clipboard
function copyText(text) {
  // Use the Clipboard API to copy text
  navigator.clipboard.writeText(text).then(() => {
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'wd-toast';
    toast.textContent = 'تم نسخ النص بنجاح';
    document.body.appendChild(toast);
    
    // Remove toast after 2 seconds
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// التحكم في قائمة الحساب العائمة
const profileBtn = document.querySelector('.wd-profile-floating-btn');
const profileMenu = document.querySelector('.wd-profile-floating-menu');
const statusOptions = document.querySelectorAll('.wd-profile-floating-status-option');

// فتح وإغلاق القائمة
profileBtn.addEventListener('click', () => {
  profileMenu.classList.toggle('show');
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', (e) => {
  if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.classList.remove('show');
  }
});

// تغيير حالة المستخدم
statusOptions.forEach(option => {
  option.addEventListener('click', () => {
    // إزالة الفئة النشطة من جميع الخيارات
    statusOptions.forEach(opt => opt.classList.remove('active'));
    // إضافة الفئة النشطة للخيار المحدد
    option.classList.add('active');
    
    // تغيير لون زر الحساب حسب الحالة
    const status = option.getAttribute('data-status');
    if (status === 'available') {
      profileBtn.style.background = '#00BC60';
    } else if (status === 'busy') {
      profileBtn.style.background = '#FFD700';
    } else {
      profileBtn.style.background = '#666';
    }
  });
});

