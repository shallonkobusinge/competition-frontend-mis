const Navbar = ({ children, showUser }) => {
    return (
        <div>
            <div className="flex justify-between p-3 app-background text-white">
                <div>SUNLIGHT</div>
                {showUser === false ? null :
                    <div className="mr-6">User</div>
                }



            </div>
            <div>
                {children}
            </div>
        </div>

    )
}

export default Navbar