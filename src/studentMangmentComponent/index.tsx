import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { StudentList } from "./listComponent/listStudent";
import { useState } from "react";
import data from "./filiere.json";

export interface Student {
  firstName: string;
  lastName: string;
  age: string;
  filiere: string;
  groupe: string;
}

export const StudentMangmentComponent = () => {
  const [studentList, setStidentList] = useState<Student[]>([]);
  const [filieres] = useState(data);
  const [groups, setGroups] = useState<string[]>();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [filiere, setFiliere] = useState<string>("");
  const [groupe, setGroupe] = useState<string>("");

  const changeFiliere = (e) => {
    setFiliere(e.target.value);
    setGroups(filieres.filieres.find((f) => f.name === e.target.value)?.groupe);
  };

  const removeStudner = (student: Student) => {
    setStidentList(studentList.filter((s) => student != s));
  };
  const addStudent = () => {
    if (firstName && lastName && age && filiere && groupe) {
      const ans = [...studentList];

      ans.push({
        firstName: firstName,
        lastName: lastName,
        age: age,
        filiere: filiere,
        groupe: groupe,
      });
      setFirstName("");
      setLastName("");
      setAge("");
      setFiliere("");
      setGroupe("");
      setStidentList(ans);
    }
  };

  return (
    <div className="m-5">
      <h1>Gestion Stagiares</h1>
      <Row className="border">
        <Col md={4}>
          <div style={{ backgroundColor: "#cfcfcf" }} className="p-3">
            <Form>
              <Form.Control
                className="mb-3"
                name="firstName"
                type="text"
                placeholder="nome"
                value={firstName}
                onChange={(v) => setFirstName(v.target.value)}
              />

              <Form.Control
                className="mb-3"
                name="lastName"
                type="text"
                placeholder="prenome"
                value={lastName}
                onChange={(v) => setLastName(v.target.value)}
              />

              <Form.Control
                className="mb-3"
                name="age"
                type="text"
                placeholder="age"
                value={age}
                onChange={(v) => setAge(v.target.value)}
              />

              <Row className="mb-3">
                <Col>
                  <Form.Select
                    onChange={changeFiliere}
                    name="filiere"
                    value={filiere}
                    aria-label="choisir une Filiere"
                  >
                    <option>choisir une filiere</option>
                    {filieres.filieres.map((f) => (
                      <option id={f.id}>{f.name}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    name="group"
                    onChange={(e) => setGroupe(e.target.value)}
                    aria-label="choisir une group"
                    value={groupe}
                  >
                    <option>choisir une group</option>
                    {groups?.map((g) => (
                      <option id={g}>{g}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Button variant="outline-primary" onClick={addStudent}>
                Ajouter
              </Button>
            </Form>
          </div>
        </Col>

        <Col>
          <Table hover>
            <thead>
              <tr>
                <th>nome</th>
                <th>prenome</th>
                <th>age</th>
                <th>Filiere</th>
                <th>groupe</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((s) => (
                <tr>
                  <td>{s.firstName}</td>
                  <td>{s.lastName}</td>
                  <td>{s.age}</td>
                  <td>{s.filiere}</td>
                  <td>{s.groupe}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => removeStudner(s)}
                    >
                      supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};
