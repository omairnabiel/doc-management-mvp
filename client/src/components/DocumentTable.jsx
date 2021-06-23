import { Link } from "react-router-dom";

export const DocumentTable = ({ documents, deleteAction }) => {
  if (!documents || documents.length === 0) {
    return <div>You don't have any Documents added. Click "Add New"</div>;
  }
  return (
    <>
      <table className="table">
        <thead>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Address</th>
          <th scope="col">Phone</th>
          <th scope="col">KTP Number</th>
          <th scope="col">NPWP Number</th>
          <th scope="col">Passport Number</th>
          <th scope="col">Actions</th>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.name}</td>
              <td>{doc.email}</td>
              <td>{doc.address}</td>
              <td>{doc.phone}</td>
              <td>{doc.ktpNumber}</td>
              <td>{doc.npwpNumber}</td>
              <td>{doc.passportNumber}</td>
              <td style={{ cursor: "pointer" }}>
                <Link to={`edit/${doc._id}`}>Edit</Link>
                <Link
                  className="text-danger mx-1"
                  onClick={() => deleteAction(doc._id)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
