import styles from "./HeroHeaderSection.module.css";

const HeroHeaderSection = () => {
  return (
    <div className={styles["homepage-container"]}>
      <img
        className={styles.heroImg}
        src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="hero"
      />
    </div>
  )
}

export default HeroHeaderSection