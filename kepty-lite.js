/**
 * Kepty English Lite — contact modal + upgrade prompts
 *
 * Design notes (avoid regressions):
 * - Modal show/hide is owned ONLY by lite-contact CSS classes (no Tailwind hidden/flex).
 * - Close must stopPropagation + delay hide to prevent click-through reopening.
 * - Open triggers use ONE path (delegation). Do not also put inline openContact onclicks.
 * - training.html body is text-center; modal forces text-align:left !important.
 */
(function (global) {
    var WEB3FORMS_ACCESS_KEY = 'bcb8a667-538a-4b4c-a0a6-f6f88f95aa08';
    var MSG_SHADOWING =
        '現在ご活用頂いている無料版では、音源の再生ができません。機能をフルに活用されたい場合は、有料版のお申し込みをご実施ください。';
    var MSG_SHARE =
        '現在ご活用頂いている無料版では、録音の共有ができません。機能をフルに活用されたい場合は、有料版のお申し込みをご実施ください。';

    var lastFocused = null;
    var pendingReason = '';
    var bound = false;
    var closingGuardUntil = 0;

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

    function showContactFormState() {
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

    function isOpen(modal) {
        return !!(modal && modal.classList.contains('is-open'));
    }

    function setModalOpen(open) {
        var modal = $('lite-contact-modal');
        if (!modal) return;
        if (open) {
            modal.classList.add('is-open');
            modal.removeAttribute('hidden');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lite-contact-open');
        } else {
            modal.classList.remove('is-open');
            modal.setAttribute('hidden', '');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lite-contact-open');
        }
    }

    function openContact(reasonText) {
        if (Date.now() < closingGuardUntil) return false;
        var modal = $('lite-contact-modal');
        if (!modal) return false;
        pendingReason = reasonText ? String(reasonText) : '';
        lastFocused = document.activeElement;
        resetContactState();
        setModalOpen(true);
        window.setTimeout(function () {
            var first = $('lite-contact-name');
            if (first) {
                try {
                    first.focus();
                } catch (e) {}
            }
        }, 30);
        return true;
    }

    function closeContact() {
        var modal = $('lite-contact-modal');
        if (!modal || !isOpen(modal)) return;
        // Prevent the same click from hitting an opener underneath.
        closingGuardUntil = Date.now() + 400;
        setModalOpen(false);
        pendingReason = '';
        if (lastFocused && typeof lastFocused.focus === 'function') {
            try {
                lastFocused.focus();
            } catch (e) {}
        }
    }

    function showLiteUpgrade(kind) {
        openContact(kind === 'share' ? MSG_SHARE : MSG_SHADOWING);
        return false;
    }

    function bindContactUi() {
        if (bound) return;
        bound = true;

        setModalOpen(false);

        document.addEventListener(
            'click',
            function (event) {
                var t = event.target;
                if (!t || !t.closest) return;

                var openEl = t.closest('.lite-contact-open');
                if (openEl) {
                    event.preventDefault();
                    event.stopPropagation();
                    openContact('');
                    return;
                }

                var closeEl = t.closest('[data-lite-contact-close]');
                if (closeEl) {
                    event.preventDefault();
                    event.stopPropagation();
                    closeContact();
                }
            },
            true
        ); // capture: handle before other handlers

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && isOpen($('lite-contact-modal'))) {
                event.preventDefault();
                closeContact();
            }
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

    global.KeptyLite = {
        openContact: openContact,
        closeContact: closeContact,
        showLiteUpgrade: showLiteUpgrade,
        MSG_SHADOWING: MSG_SHADOWING,
        MSG_SHARE: MSG_SHARE
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindContactUi);
    } else {
        bindContactUi();
    }
})(typeof window !== 'undefined' ? window : this);
