import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container shadow p-3 mb-5 bg-white rounded" style={{ marginTop: "7rem" }}>
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h1 className="text-primary">Appraisal System</h1>
          <div className="mt-4 mb-4 d-flex justify-content-center">
            <Link to='/login'>
              <button className="btn btn-info" style={{ marginRight: "1rem" }}>STAFF</button>
            </Link>
            <Link to='/login'>
              <button className="btn btn-info" style={{ marginLeft: "1rem" }}>ADMIN</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
