import "./UserCard.css"

export default function UserCard() {

  const user = JSON.parse(localStorage.getItem("user"));

    return (

                <div className="userContainer shadow mt-4 p-4">

                    <h2 className="mb-4 text-center">My Profile</h2>

                    <div className="text-center mb-4">

                        <div
                            className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                            style={{
                                width: "80px",
                                height: "80px",
                                fontSize: "32px",
                                fontWeight: "bold"
                            }}
                        >
                            {user?.fullName?.charAt(0).toUpperCase()}
                        </div>

                    </div>

                    <table className="table">

                        <tbody>

                            <tr className="profile-info">
                                <td><strong>Full Name</strong></td>
                                <td>{user?.fullName}</td>
                            </tr>

                            <tr className="profile-info">
                                <td><strong>Email</strong></td>
                                <td>{user?.email}</td>
                            </tr>

                            <tr className="profile-info">
                                <td><strong>User ID</strong></td>
                                <td>{user?.id}</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

          
        
    );
}
