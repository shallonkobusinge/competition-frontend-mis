


const StudentsTable = ({ students = [] }) => {
    return (
        <div>
            <table className="sm-transfers-table">
                <thead>
                    <tr>
                        <th>Physics Marks</th>
                        <th>English Marks</th>
                        <th>Social Marks</th>

                    </tr>
                </thead>
            </table>

        </div>
    )
}

export default StudentsTable;