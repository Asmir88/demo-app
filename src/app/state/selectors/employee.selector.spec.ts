import * as EmployeeSelectors from "./employee.selector"; 

describe('CallDeviceOverview Selectors', () => {
  let state: any;

  beforeEach(() => {
    state = {
        employeesState: {
          employees: [
            {
                id: 1,
                firstName: "Sebastian",
                lastName: "Eschweiler",
                email: "sebastian@codingthesmartway.com"
            },
            {
                id: 2,
                firstName: "Steve",
                lastName: "Palmer",
                email: "steve@codingthesmartway.com"
            },
            {
                id: 3,
                firstName: "Ann",
                lastName: "Smith",
                email: "ann@codingthesmartway.com"
            }
        ]}
    };
  });

  describe('Employees Selectors', () => {
    it('should return all employees', () => {
      const result = EmployeeSelectors.selectEmployees(state);
      expect(result).toEqual([
        {
            id: 1,
            firstName: "Sebastian",
            lastName: "Eschweiler",
            email: "sebastian@codingthesmartway.com"
          },
          {
            id: 2,
            firstName: "Steve",
            lastName: "Palmer",
            email: "steve@codingthesmartway.com"
          },
          {
            id: 3,
            firstName: "Ann",
            lastName: "Smith",
            email: "ann@codingthesmartway.com"
          }
      ]);
    });

    it('should return employee for given id', () => {
      const result = EmployeeSelectors.selectEmployee(2)(state);

      expect(result).toEqual({
        email: "steve@codingthesmartway.com",
        firstName: "Steve",
        id: 2,
        lastName: "Palmer"
      });
    });
  });
});
