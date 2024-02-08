document
    .querySelector<HTMLFormElement>("#login-form")
    ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        console.log(email.value, password.value);
    });
