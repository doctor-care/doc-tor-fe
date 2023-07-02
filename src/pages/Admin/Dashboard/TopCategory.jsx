// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import MuiDivider from "@mui/material/Divider";
import { useEffect } from "react";
// import { categoryByPeriodTimeService } from "../../../services/RevenueService";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Download } from "@mui/icons-material";
import ExportExcel from "./ExportExcel";

const TopCategory = (props) => {
  const [categoryList, setCategoryList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (props.startDate && props.endDate) {
        // const categoryData = await categoryByPeriodTimeService(
        //   props.startDate,
        //   props.endDate
        // );
        // setCategoryList(categoryData.data);
      }
    };

    fetchData();
  }, [props.startDate, props.endDate]);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5 className="fw-semibold ms-2 ">Top Categories</h5>

        <Button
          onClick={handleClick}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textTransform: "none",
            gap: "1rem",
          }}
        >
          <Download sx={{ color: "#CCA752", fontSize: "25px" }} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MenuItem>
            {" "}
            <ExportExcel
              data={[categoryList]}
              label={["Top Categories"]}
            />
          </MenuItem>
        </Menu>
      </div>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: ["column", "column", "row"],
        }}
      >
        <Box sx={{ width: "100%" }}>
          <CardContent sx={{ pb: (theme) => `${theme.spacing(2)} !important` }}>
            {categoryList?.length > 0 &&
              categoryList.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: index !== categoryList.length - 1 ? 3 : 0,
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 38,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 600, color: "success.main" }}
                      >
                        {index + 1}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        ml: 4,
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          marginRight: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "0.875rem" }}
                        >
                          {item.name}
                        </Typography>
                        {/* <Typography variant='caption'>{item.subtitle}</Typography> */}
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, color: "success.main" }}
                      >
                        ${item.revenue}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default TopCategory;
