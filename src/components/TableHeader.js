const TableHeader = ({ activeTab, changeActiveTab, tabs = [], children }) => {
    return (
        <>
            <divn className="flex justify-between tabs-view-mode">

                <div>
                    {tabs.map((tab) => (
                        <button className={` ml-4 ${activeTab === tab && 'active'}`} onClick={() => changeActiveTab(tab)}>{tab}</button>
                    ))}

                </div>
                <div>

                    {children}
                </div>
            </divn>
        </>
    )
}


export default TableHeader