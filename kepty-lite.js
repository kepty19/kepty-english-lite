/**
 * Kepty English Lite — upgrade prompts + contact (Web3Forms, same endpoint as youth site).
 */
(function (global) {
    var WEB3FORMS_ACCESS_KEY = 'bcb8a667-538a-4b4c-a0a6-f6f88f95aa08';
    var MSG_SHADOWING =
        '現在ご活用頂いている無料版では、音源の再生ができません。機能をフルに活用されたい場合は、有料版のお申し込みをご実施ください。';
    var MSG_SHARE =
        '現在ご活用頂いている無料版では、録音の共有ができません。機能をフルに活用されたい場合は、有料版のお申し込みをご実施ください。';

    var lastFocused = null;
    var pendingReason = '';

    function $(id) {
        return document.getElementById(id);
    }

    function setError(message) {
        var errorEl = $('lite-contact-error');
        if (!errorEl) return;
        if (!message) {
            errorEl.hidden = true;
            errorEl.textContent = '';
            return;
        }
        errorEl.hidden = false;
        errorEl.textContent = message;
    }

    function showContactFormPanel() {
        var formPanel = $('lite-contact-form-panel');
        var successPanel = $('lite-contact-success');
        if (formPanel) formPanel.hidden = false;
        if (successPanel) successPanel.hidden = true;
    }

    function showContactSuccessState() {
        var formPanel = $('lite-contact-form-panel');
        var successPanel = $('lite-contact-success');
        if (formPanel) formPanel.hidden = true;
        if (successPanel) successPanel.hidden = false;
    }

    function resetContactState() {
        var form = $('lite-contact-form');
        if (form) form.reset();
        setError(null);
        showContactFormState();
        var submitBtn = $('lite-contact-submit');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
        var reasonEl = $('lite-contact-reason');
        if (reasonEl) reasonEl.textContent = pendingReason || '';
        var reasonWrap = $('lite-contact-reason-wrap');
        if (reasonWrap) reasonWrap.hidden = !pendingReason;
    }

    /** Tailwind `flex` overrides HTML [hidden]; drive visibility with inline display. */
    function setModalOpen(modal, open) {
        if (!modal) return;
        if (open) {
            modal.removeAttribute('hidden');
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
        } else {
            modal.setAttribute('hidden', '');
            modal.classList.add('hidden');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    function isModalOpen(modal) {
        return !!(modal && modal.style.display === 'flex');
    }

    function openContact(reasonText) {
        var modal = $('lite-contact-modal');
        if (!modal) return;
        pendingReason = reasonText ? String(reasonText) : '';
        lastFocused = document.activeElement;
        resetContactState();
        setModalOpen(modal, true);
        document.body.classList.add('lite-contact-open');
        window.setTimeout(function () {
            var first = $('lite-contact-name');
            if (first) first.focus();
        }, 50);
        if (global.lucide && typeof global.lucide.createIcons === 'function') {
            try {
                global.lucide.createIcons();
            } catch (e) {}
        }
    }

    function closeContact() {
        var modal = $('lite-contact-modal');
        if (!modal) return;
        setModalOpen(modal, false);
        document.body.classList.remove('lite-contact-open');
        pendingReason = '';
        if (lastFocused && typeof lastFocused.focus === 'function') {
            try {
                lastFocused.focus();
            } catch (e) {}
        }
    }

    function showLiteUpgrade(kind) {
        var msg = kind === 'share' ? MSG_SHARE : MSG_SHADOWING;
        openContact(msg);
        return false;
    }

    function bindContactUi() {
        var modal = $('lite-contact-modal');
        if (!modal) return;
        // Always force closed on load (fixes Tailwind flex vs [hidden]).
        setModalOpen(modal, false);
        document.body.classList.remove('lite-contact-open');
        if (modal.getAttribute('data-lite-bound') === '1') return;
        modal.setAttribute('data-lite-bound', '1');

        modal.querySelectorAll('[data-lite-contact-close]').forEach(function (btn) {
            btn.addEventListener('click', closeContact);
        });

        document.querySelectorAll('.lite-contact-open').forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                openContact('');
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && isModalOpen(modal)) closeContact();
        });

        var form = $('lite-contact-form');
        if (!form) return;
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            setError(null);
            var data = new FormData(form);
            var userName = String(data.get('userName') || '').trim();
            var userEmail = String(data.get('userEmail') || '').trim();
            var userMessage = String(data.get('userMessage') || '').trim();
            if (!userName || !userEmail || !userMessage) {
                setError('すべて入力してください');
                return;
            }

            var fullMessage =
                (pendingReason ? '【Lite制限】\n' + pendingReason + '\n\n' : '') +
                'お名前: ' +
                userName +
                '\nメールアドレス: ' +
                userEmail +
                '\n\nお問い合わせ内容:\n' +
                userMessage;

            var payload = new FormData();
            payload.append('access_key', WEB3FORMS_ACCESS_KEY);
            payload.append('subject', '【Kepty English Lite】有料版のお申し込み・お問い合わせ');
            payload.append('from_name', userName);
            payload.append('name', userName);
            payload.append('email', userEmail);
            payload.append('replyto', userEmail);
            payload.append('message', fullMessage);

            var submitBtn = $('lite-contact-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload })
                .then(function (response) {
                    return response.json().then(function (result) {
                        return { ok: response.ok, result: result };
                    });
                })
                .then(function (res) {
                    if (res.ok && res.result && res.result.success) {
                        form.reset();
                        showContactSuccessState();
                        return;
                    }
                    setError(
                        (res.result && res.result.message) ||
                            '送信に失敗しました。しばらくしてから再度お試しください。'
                    );
                })
                .catch(function () {
                    setError(
                        '送信に失敗しました。通信環境をご確認のうえ、contact@kepty.co へ直接メールでもお問い合わせください。'
                    );
                })
                .finally(function () {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Send Message';
                    }
                });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindContactUi);
    } else {
        bindContactUi();
    }

    global.KeptyLite = {
        openContact: openContact,
        closeContact: closeContact,
        showLiteUpgrade: showLiteUpgrade,
        MSG_SHADOWING: MSG_SHADOWING,
        MSG_SHARE: MSG_SHARE
    };
})(typeof window !== 'undefined' ? window : this);
