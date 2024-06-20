import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ReportedPost() {
  let { amenity_id } = useParams();
  const [reportPost, setReportPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [restoredPosts, setRestoredPosts] = useState({});
  const [jumpToPage, setJumpToPage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    getReportPost();
  }, []);

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setErrorMessage(""); // Clear any previous error messages
    } else {
      setErrorMessage(`Page number ${page} is out of range. Please enter a number between 1 and ${totalPages}.`);
    }
  };

  const getReportPost = () => {
    setLoading(true);
    axiosClient.get('/get-all-reported-post')
      .then(({ data }) => {
        setLoading(false);
        setReportPost(data.data);
        setSearchResults(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Reported Post</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Reported By Profile</th>
              <th>Boost Status</th>
              <th>Report Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentItems.map((b, index) => (
                <tr key={b.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    {b.profile?.user_type_id === 3 ? b.profile?.community_detail.name_of_community : b.profile?.user_detail.full_name}
                  </td>
                  <td>{b.post?.boost_status}</td>
                  <td>{b.report_flag}</td>
                  <td>
                    {b?.post ? (
                      <>
                        <Link className="btn-custom" to={'/reported-post/' + b.post_id}>View</Link>
                      </>
                    ) : (
                      <>Deleted</>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div className="pagination">
          <button
            className={`btn-pagination paginationButton ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          <span className="currentPageNumber">
            Page <span style={{ color: '#eb6238', fontWeight: 'bold' }}>{currentPage}</span> of {totalPages}
          </span>
          <button
            className={`btn-pagination paginationButton ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
        <div className="jump-to-page" >
          <input
            type="number"
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            placeholder="Enter page number" className="form-control"
          />
          <button onClick={handleJumpToPage}>Jump to Page</button>
        </div>

        {errorMessage && (
          <div className="pagination-error">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
