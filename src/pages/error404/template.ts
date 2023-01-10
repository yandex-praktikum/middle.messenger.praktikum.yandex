export const template = `
[[ temp_nav? ]]
<main class="page-error">
    <div class="page-error__title">{{ title }}</div>
    <div class="page-error__text">{{ text }}</div>
    <div class="page-error__link">
        [[ link? &href='/' &title='{{ link }}' ]]
    </div>
</main>
`;
