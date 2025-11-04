<?php
    include_once("conn.php");

    $method = $_SERVER["REQUEST_METHOD"];

    //resgatando infos:
    if($method === "GET"){
        //bordas:
        $bordasQuery = $conn->query("SELECT * FROM bordas;");
        $bordas = $bordasQuery->fetchAll();

        //massas:
        $massasQuery = $conn->query("SELECT * FROM massas;");
        $massas = $massasQuery->fetchAll();

        //sabores:
        $saboresQuery = $conn->query("SELECT * FROM sabores;");
        $sabores = $saboresQuery->fetchAll();
    }
    //criando pedido:
    else if($method === "POST"){
        $data = $_POST;

        $borda = $data["borda"];
        $massa = $data["massa"];
        $sabores = $data["sabores"];

        //validacao de sabores maximos:
        if(count($sabores) > 3){
            $_SESSION["msg"] = "Selecione no máximo 3 sabores!";
            $_SESSION["status"] = "warning";
        }
        else{
            //salvando os valores na pizza:
            $stmt = $conn->prepare("INSERT INTO pizzas (borda_id, massa_id) VALUES (:borda, :massa)");

            //filtrando inputs:
            $stmt->bindParam(":borda", $borda, PDO::PARAM_INT); //so deixa passar se for inteiro
            $stmt->bindParam(":massa", $massa, PDO::PARAM_INT); //so deixa passar se for inteiro
            //troca o parametro por um dado valido e depois executa:
            $stmt->execute();
            //resgatando id da ultima pizza:
            $pizzaId = $conn->lastInsertId();

            $stmt = $conn->prepare("INSERT INTO pizza_sabor (pizza_id, sabor_id) VALUES (:pizza, :sabor)");
            //repeticao para salvar os sabores:
            foreach($sabores as $sabor){
                //filtrando inputs:
                $stmt->bindParam(":pizza", $pizzaId, PDO::PARAM_INT);
                $stmt->bindParam(":sabor", $sabor, PDO::PARAM_INT);
                $stmt->execute();
            }

            //criando o pedido da pizza:
            $stmt = $conn->prepare("INSERT INTO pedidos (pizza_id, status_id) VALUES (:pizza, :status)");
            //status-> sempre inicia com 1 (seria em producao):
            $statusId = 1;
            //filtrando inputs:
            $stmt->bindParam(":pizza", $pizzaId);
            $stmt->bindParam(":status", $statusId);
            $stmt->execute();

            //exibir mensagem de sucesso:
            $_SESSION["msg"] = "Pedido realizado com sucesso";
            $_SESSION["status"] = "success";

        }
        //retorna para a pag inicial:
        header("Location: ..");
    }
?>