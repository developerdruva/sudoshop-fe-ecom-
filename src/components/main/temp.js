<nav className="navbar sticky-top flex-md-nowrap p-0 shadow" style={{backgroundColor: '#E8F6F3'}} >
<span className="navbar-brand col-md-2" >
    sudoshop
</span>
<input className="form-control shadow-sm" type="text" placeholder="Search your Item"/>
<ul className="navbar-nav px-3 ">
    <li className="nav-item text-nowrap ">
        <NavLink to='/' className="btn btn-link text-decoration-none mybtnhover" style={{fontWeight: '500'}}>Log Out</NavLink>
    </li>
</ul>
</nav>:
<nav className="navbar sticky-top flex-md-nowrap p-0 shadow" style={{backgroundColor: '#E8F6F3'}} >
    <div className="container">
        <span className="navbar-brand col-md-2" >
            sudoshop
        </span>
        <ul className="nav ">
            <li className="nav-item">
               <NavLink to='/home' className="nav-link btn btn-link mybtnhover" >Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/about' className="nav-link btn btn-link mybtnhover" >About</NavLink>
            </li>
            <li className="nav-item ">
                <NavLink to='/cart' className="nav-link btn btn-link mybtnhover" >Cart</NavLink>
            </li>
            <li className='nav-item'>
                <Dropdown>
                    <Dropdown.Toggle variant="link">
                        <FaUserCircle style={{width : '1.5rem', height: '1.5rem', color: 'darkcyan'}}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item ><span className="mytextcolor">{localStorage.getItem('userId')}</span></Dropdown.Item>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item ><NavLink to='/' onClick={localStorage.removeItem('token')} >Log Out</NavLink></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        </ul>
    </div>
</nav>