-- 🚀 Drop table if it exists (to avoid conflicts)
DROP TABLE IF EXISTS employees;

-- ✅ Create Table (Renaming "position" to "job_position")
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    job_position VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL
);

-- ✅ Procedure: Insert Employee
CREATE OR REPLACE PROCEDURE add_employee(
    emp_name VARCHAR,
    emp_position VARCHAR,
    emp_salary DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO employees (name, job_position, salary) 
    VALUES (emp_name, emp_position, emp_salary);
END;
$$;

-- ✅ Function: Read All Employees
CREATE OR REPLACE FUNCTION get_all_employees()
RETURNS TABLE (id INT, name VARCHAR, job_position VARCHAR, salary DECIMAL) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT e.id, e.name, e.job_position, e.salary FROM employees e;
END;
$$;

-- ✅ Function: Read One Employee by ID
CREATE OR REPLACE FUNCTION get_employee_by_id(emp_id INT)
RETURNS TABLE (id INT, name VARCHAR, job_position VARCHAR, salary DECIMAL)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    SELECT e.id, e.name, e.job_position, e.salary 
    FROM employees e 
    WHERE e.id = emp_id;
END;
$$;

-- ✅ Procedure: Update Employee Salary by ID
CREATE OR REPLACE PROCEDURE update_employee_salary(
    emp_id INT,
    new_salary DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE employees 
    SET salary = new_salary
    WHERE id = emp_id;
END;
$$;

-- ✅ Procedure: Delete Employee by ID
CREATE OR REPLACE PROCEDURE delete_employee(
    emp_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM employees WHERE id = emp_id;
END;
$$;

-- ✅ Function: Insert Employee and Return All Employees
CREATE OR REPLACE FUNCTION add_employee_and_get_all(
    emp_name VARCHAR,
    emp_position VARCHAR,
    emp_salary DECIMAL
)
RETURNS TABLE (id INT, name VARCHAR, job_position VARCHAR, salary DECIMAL)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO employees (name, job_position, salary) 
    VALUES (emp_name, emp_position, emp_salary);
    
    RETURN QUERY 
    SELECT e.id, e.name, e.job_position, e.salary 
    FROM employees e;
END;
$$;


CALL add_employee('Emma Nyamasi', 'Backend Developer', 95000);


SELECT * FROM get_all_employees();


SELECT * FROM get_employee_by_id(1);

CALL update_employee_salary(1, 120000);

CALL delete_employee(1);


SELECT * FROM add_employee_and_get_all('John Doe', 'Data Scientist', 110000);





