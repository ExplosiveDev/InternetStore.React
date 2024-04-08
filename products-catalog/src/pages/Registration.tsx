import React, { FC } from "react";
import { Link } from "react-router-dom";

const Registration: FC = () => {
    return (
        <section className="py-3 py-md-5 py-xl-8">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="mb-5">
                            <h2 className="display-5 fw-bold text-center">Registration</h2>
                            <p className="text-center m-0">Have an account? <Link to={"/login"}>Sign in</Link></p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-8">
                        <div className="row gy-5 justify-content-center">
                            <div className="col-12 col-lg-5">
                                <form action="#!">
                                    <div className="row gy-3 overflow-hidden">

                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input type="name" className="form-control border-0 border-bottom rounded-0" name="userName" id="userName" placeholder="User Name" required />
                                                <label htmlFor="userName" className="form-label">User Name</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input type="email" className="form-control border-0 border-bottom rounded-0" name="email" id="email" placeholder="name@example.com" required />
                                                <label htmlFor="email" className="form-label">Email</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control border-0 border-bottom rounded-0" name="password" id="password" value="" placeholder="Password" required />
                                                <label htmlFor="password" className="form-label">Password</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control border-0 border-bottom rounded-0" name="confirmPassword" id="confirmPassword" value="" placeholder="Password" required />
                                                <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn btn-lg btn-dark rounded-0 fs-6" type="submit">Registration</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registration