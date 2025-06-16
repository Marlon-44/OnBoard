import styles from "./index.module.css"
const Search = () => {
    return (
        <div className={styles.search__container}>
            
            <input
                type="text"
                placeholder="Search..."
                className={styles.search__input}
            />
            <img src="assets/search__icon__black.svg" alt="" className={styles.search__icon} />
        </div>
    )
}

export default Search;