import { Request, Response } from "express";
import { addStaff, StaffType } from "./staff.model";
import Db from "../../utils/db";


//By id - return staff member
export async function getStaffById(req: Request, res: Response) {
    try {
        let { id } = req.params;
        const result = await Db.query(`select * from Staff where UserId = ${id}`);
        let staff : StaffType = result;

        res.send(staff);

    } catch (error) {
        res.status(500).json(error);
    }
}



