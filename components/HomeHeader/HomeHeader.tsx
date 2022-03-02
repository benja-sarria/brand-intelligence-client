import style from "./HomeHeader.module.scss";

export const HomeHeader = () => {
    return (
        <>
            <img
                src="./assets/img/brandLogo.webp"
                alt="Brand Intelligence Logo"
                className={`${style["letter-logo"]}`}
            />
            <img
                src="./assets/img/icon.webp"
                alt="Brand Intelligence Logo"
                className={`${style["brand-logo"]}`}
            />
            <h1 className={`${style["title"]}`}>
                Brand Intelligence - Una ayuda inteligente para proteger tu
                Marca
            </h1>
        </>
    );
};
