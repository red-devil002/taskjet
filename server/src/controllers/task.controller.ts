import { Request, Response } from "express"; //Typescript imports
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); //Calling the PrismaClient to connect to the database

// Function to get all project's tasks
export const getTasks = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { projectId } = req.query; //Extracting the projectId from the request parameters
    try{
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId), //Filtering tasks by projectId
            },
            include: {
                author: true, //Including the author details
                assignee: true, //Including the assignee details
                comments: true, //Including the comments details
                attachments: true, //Including the attachments details
            },
        });

        res.json(tasks);
    } catch (error: any){
        res.status(500).json({ message: `Error retrieving tasks: ${error.message}` });
    }
}



// Function to create a new task
export const createTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { 
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
    } = req.body;
    try{
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            },
        });
        res.status(201).json(newTask);
    } catch (error: any){
        res.status(500).json({ message: `Error creating a task: ${error.message}` });
    }
}

// Function to update a taskbackend (Drag and Drop)
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId), //Filtering tasks by taskId
            },
            data: {
                status: status, //Updating the status of the task
            },
        });
        res.json(updatedTask);
    }
    catch (error: any) {
        res.status(500).json({ message: `Error updating task status: ${error.message}` });
    }
}