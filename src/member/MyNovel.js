import React from 'react';

const MyNovel = () => {



    return (
        <div className="entries-wrapper" style={{marginBottom:"15px"}}>
            <div className="row">
                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="entries-info text-center">
                        <p>John Doe</p>
                        <p>Paul Park </p>
                        <p>Lorem ipsum dolor set amet</p>
                        <p>NYC</p>
                        <p>New York</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center">
                    <div className="entries-edit-delete text-center">
                        <button className="edit">Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center">
                    <div className="entries-edit-delete text-center">
                        <button className="edit">Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyNovel;