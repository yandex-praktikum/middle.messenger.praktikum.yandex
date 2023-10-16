const initDropdowns = (() => {
  function hideDropDown(dropdown: Element, trigger: Element) {
    dropdown.classList.remove('active');

    if (!trigger) return;

    trigger.setAttribute('aria-expanded', 'false');
    if (trigger.hasAttribute('title')) {
      const openText = trigger.getAttribute('data-open-text');
      if (openText) {
        trigger.setAttribute('title', openText);
      }
    }
  }

  return () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    if (dropdowns.length === 0) return;

    document.addEventListener('click', (e) => {
      const dropdowns = document.querySelectorAll('.dropdown');
      const { target } = e;

      if (target instanceof HTMLElement) {
        const parent = target.closest('.dropdown');

        if (!parent) {
          dropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector('.dropdown__trigger');
            if (trigger) {
              hideDropDown(dropdown, trigger);
            }
          })

          return;
        }

        if (!target.closest('.dropdown__trigger')) {
          return;
        }

        dropdowns.forEach((dropdown) => {
          if (dropdown !== parent) {
            const trigger = dropdown.querySelector('.dropdown__trigger');
            if (trigger) {
              hideDropDown(dropdown, trigger);
            }
          }
        })

        if (parent.classList.contains('active')) {
          hideDropDown(parent, target);
        } else {
          parent.classList.add('active');
          target.setAttribute('aria-expanded', 'true');
          if (target.hasAttribute('title')) {
            const closeText = target.getAttribute('data-close-text');
            if (closeText) {
              target.setAttribute('title', closeText);
            }
          }
        }
      }
    })
  }
})()

export default initDropdowns;
