import styles from "../page.module.css";
const CheckOut = () => {
  return (
    <div className="container mt-4">
      <form action="">
        <div className="row ">
          <div className="col-6">
            <h3>BILLING ADDRESS</h3>
            <div className="input-group mt-2">
              <span className="input-group-text ">First and last name</span>
              <input
                type="text"
                aria-label="First name"
                className="form-control"
              />
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
              />
            </div>
            <div className="mb-3 mt-1">
              <label htmlFor="Email address" className="form-label">
                Email address:
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="City" className="form-label">
                City:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Cairo"
              />
            </div>
            <div className="mb-1 mt-2">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="55 Al Henderson Drive"
              />
            </div>
            <div className="row ">
              <div className="col-6 mt-5">
                <label htmlFor="state" className=" col-form-label">
                  State:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Egypt"
                  />
                </div>
              </div>
              <div className="col-6 mt-5">
                <label htmlFor="Zip code" className=" col-form-label">
                  Zip Code:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="123 456"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <h3>PAYMENT METHODS</h3>
            <div className="mb-3 row">
              <label
                htmlFor="Cards Accepted"
                className="col-sm-2 col-form-label"
              >
                Cards Accepted:
              </label>
              <div className="col-sm-10">
                <img src="img/imgcards.png" alt="" />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="Name On Card" className="col-sm-2 col-form-label">
                Name On Card :
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mr.jacob aiden"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="Credit Card Number"
                className="col-sm-2 col-form-label"
              >
                Credit Card Number :{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  placeholder="111 2222 3333 4444"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="Exp. Month" className="col-sm-2 col-form-label">
                Exp. Month :
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Augest"
                />
              </div>
            </div>
            <div className="row g-0">
              <div className="col-6">
                <label htmlFor="Exp. Year" className="col-sm-2 col-form-label">
                  Exp.Year:
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="2025"
                  />
                </div>
              </div>
              <div className="col-6">
                <label htmlFor="CVV" className="col-sm-2 col-form-label">
                  CVV:
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <button
        className={`btn mb-4 w-100 mt-4 text-light btn-lg ${styles.btnBg}`}
        type="submit"
      >
        Check Out
      </button>
    </div>
  );
};
export default CheckOut;
