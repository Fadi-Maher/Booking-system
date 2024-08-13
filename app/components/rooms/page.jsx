import React from 'react';
import styles from "./page.module.css"
import Link from 'next/link';

const Rooms = () => {
    return (
        <section className="container mt-3">
            <div className="container-fluid">
                <div className={styles.roomItems}>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                        <div >
                            <div className={styles.roomitem}
                                style={{ backgroundImage: `url('/roomsGallery/room-b1.jpg')` ,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'top center',
                                 }} >
                                <div className={styles.hrText}>
                                    <h3>Double Room</h3>
                                    <h2>199$<span>/Pernight</span></h2>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={styles.ro}>Size:</td>
                                                <td>30 ft</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Capacity:</td>
                                                <td>Max person 5</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Bed:</td>
                                                <td>King Beds</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Services:</td>
                                                <td>Wifi, Television, Bathroom,...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Link href="#" className={styles.primarybtn}>More Details</Link>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                        <div  >
                            <div
                                className={styles.roomitem}
                                style={{ backgroundImage: `url('/roomsGallery/room-b2.jpg')` ,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'top center',}}>
                                <div className={styles.hrText}>
                                    <h3>Premium King Room</h3>
                                    <h2>159$<span>/Pernight</span></h2>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={styles.ro}>Size:</td>
                                                <td>30 ft</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Capacity:</td>
                                                <td>Max person 5</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Bed:</td>
                                                <td>King Beds</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Services:</td>
                                                <td>Wifi, Television, Bathroom,...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Link href="#" className={styles.primarybtn}>More Details</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                        <div  >
                            <div
                               className={styles.roomitem}
                                style={{ backgroundImage: `url('/roomsGallery/room-b3.jpg')` ,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'top center',}}>
                                <div className={styles.hrText}>
                                    <h3>Deluxe Room</h3>
                                    <h2>198$<span>/Pernight</span></h2>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={styles.ro}>Size:</td>
                                                <td>30 ft</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Capacity:</td>
                                                <td>Max person 5</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Bed:</td>
                                                <td>King Beds</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Services:</td>
                                                <td>Wifi, Television, Bathroom,...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Link href="#" className={styles.primarybtn}>More Details</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                       
                            <div className={styles.roomitem}
                                style={{ backgroundImage: `url('/roomsGallery/room-b4.jpg')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'top center', }}>
                                <div className={styles.hrText}>
                                    <h3>Family Room</h3>
                                    <h2>299$<span>/Pernight</span></h2>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={styles.ro}>Size:</td>
                                                <td>30 ft</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Capacity:</td>
                                                <td>Max person 5</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Bed:</td>
                                                <td>King Beds</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.ro}>Services:</td>
                                                <td>Wifi, Television, Bathroom,...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Link href="#" className={styles.primarybtn}>More Details</Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Rooms;
