import { Injectable, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class StudentsService {
    constructor(@Inject("CACHE_MANAGER") private cacheManager: Cache) {}

    async getStudents() {
        // await this.cacheManager.set('key1', 'Hello');
        // return this.cacheManager.get('key1');
        // const cacheData = await this.cacheManager.get("students");

        // if (cacheData) {
        //     console.log("I got data from cache.");
        //     return cacheData;
        // }
        const studentsData = await this.retrieveStudentFromDb();
        //await this.cacheManager.set("students", studentsData, 60 * 10000);
        return studentsData;
    }
    async retrieveStudentFromDb() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const students = [
                    {
                        name: "abc",
                        age: 20,
                        GPA: 4,
                    },
                    {
                        name: "EE",
                        age: 15,
                        GPA: 3,
                    },
                    {
                        name: "tt",
                        age: 23,
                        GPA: 3.3,
                    },
                    {
                        name: "FF",
                        age: 18,
                        GPA: 4,
                    },
                ];
                resolve(students);
            }, 1000);
        });
    }
}
