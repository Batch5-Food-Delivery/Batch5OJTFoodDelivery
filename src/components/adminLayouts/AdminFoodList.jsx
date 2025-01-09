import { useDispatch, useSelector } from "react-redux";

import { Button, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteFood,
  fetchAllMenus,
  getAllMenus,
  getError,
  getStatus,
} from "../../features/foods/foodSlice";
import classes from "./adminFoodList.module.css";
import { useEditFoodMutation } from "../../features/menu/menuSlice";
import EditFoodModal from "../../features/foods/EditFoodModal";

const AdminFoodList = () => {
  const menus = useSelector(getAllMenus);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState();
  const handleOpenEdit = (menu) => {
    const selected = {
      ...menu,
      picture: menu.picture
        ? `http://localhost:8686/food/image/${menu.picture}`
        : "https://placehold.co/100?text=Food+Item",
    };
    setSelectedMenu(selected);
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const onDelete = (id) => {
    dispatch(deleteFood(id));
    navigate("/admin/foods");
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllMenus());
    }
  }, [status, dispatch]);

  let content = "";

  if (status === "loading") {
    content = (
      <tr>
        <td colSpan="4">Loading...</td>
      </tr>
    );
  }

  if (status === "success") {
    content = menus?.map((menu) => (
      <tr key={menu.id} className={classes.tableRow}>
        <td>{menu.id}</td>
        <td>
          <img
            src={
              menu.picture
                ? `http://localhost:8686/food/image/${menu.picture}`
                : "https://placehold.co/100?text=Food+Item"
            }
            alt={menu.name}
            className={classes.menuImg}
          />
        </td>
        <td>{menu.name}</td>
        <td>
          <Button
            className={`${classes.button} ${classes.updateButton}`}
            onClick={() => handleOpenEdit(menu)}
          >
            <i className="bi bi-pencil"></i>
          </Button>
          <Button
            className={`${classes.button} ${classes.deleteButton}`}
            onClick={() => onDelete(menu.id)}
            style={{ marginLeft: "10px" }}
          >
            <i className="bi bi-trash"></i> Delete
          </Button>
        </td>
      </tr>
    ));
  }

  if (status === "failed") {
    content = (
      <tr>
        <td colSpan="4">{error}</td>
      </tr>
    );
  }

  const handleUpdate = (id) => {
    // Navigate to the update page
    navigate(`/admin/menu-update/${id}`);
  };

  return (
    <>
      <Container className="my-4">
        <div>
          <h2 className="mb-4">Admin Food List</h2>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/admin/create");
            }}
          >
            Create
          </Button>
        </div>
        <div className={classes.tableContainer}>
          <Table className={classes.table}>
            <thead className={classes.stickyHeader}>
              <tr>
                <th>ID</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </Table>
        </div>
      </Container>
      <EditFoodModal
        show={showEdit}
        food={selectedMenu}
        handleClose={handleCloseEdit}
      />
    </>
  );
};

export default AdminFoodList;
