import header from "../components/header.js";
import main from "../components/main.js";
import footer from "../components/footer.js";

const active = () => {
    const component = `
            <section className="todoapp" id="root">
                <Header />
                <Main />
                <Footer />
            </section>
    `

    const context = {
        Active: () => component,
        ...header(),
        ...main(),
        ...footer(),
    }
    return context;
}

export default active;