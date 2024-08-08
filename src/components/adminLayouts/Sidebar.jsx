
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';


const Sidebar = () => {

    
  return (
      <CDBSidebar textColor="#333" className='w-100' >
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />} >Contrast</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu  >
            <CDBSidebarMenuItem className='text-start px-2'  >  &#9865;  Restaurant</CDBSidebarMenuItem>
            <CDBSidebarMenuItem className='text-start px-2' > &#9865;  Region</CDBSidebarMenuItem>
            <CDBSidebarMenuItem className='text-start px-2'   >
            &#9865; Menu
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{padding: '20px 5px'}}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
  );
};

export default Sidebar;