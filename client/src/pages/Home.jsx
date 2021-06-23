import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DocumentTable } from "../components/DocumentTable";
import axios from "axios";
import { Modal } from "../components/Modal";
export const Home = () => {
  const [documents, setDocuments] = useState();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  useEffect(() => {
    try {
      getDocuments();
    } catch (error) {}
  }, []);

  const onDeleteAction = (docId) => {
    setDeleteConfirmationVisible(true);
    setSelectedDocument(docId);
  };

  const onConfirm = async () => {
    setDeleteConfirmationVisible(false);
    try {
      await axios.delete(`/document/${selectedDocument}`);
      getDocuments();
    } catch (error) {}
  };

  const onClose = () => {
    setDeleteConfirmationVisible(false);
    setSelectedDocument(null);
  };

  async function getDocuments() {
    const result = await axios.get("/document");
    setDocuments(result.data);
  }
  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div>
          <h4 className="mb-4"> Your Documents</h4>
        </div>
        <div>
          <Link to="/add">
            <button className="btn btn-primary" type="submit">
              Add New
            </button>
          </Link>
        </div>
      </div>

      <DocumentTable documents={documents} deleteAction={onDeleteAction} />

      {isDeleteConfirmationVisible && (
        <Modal
          title="Delete Confirmation"
          body="Are you sure you want to delete?"
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};
